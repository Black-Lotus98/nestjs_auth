import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto, AuthResponseDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}
  async login(authDto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(authDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async validateUser(authDto: AuthDto): Promise<UserResponseDto | null> {
    const user = await this.userService.findUserByEmail(authDto.email);

    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    }

    return null;
  }

  async generateTokens(user: UserResponseDto): Promise<AuthResponseDto> {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<AuthResponseDto> {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    if (
      await this.tokenBlacklistService.isTokenBlacklisted(
        refreshTokenDto.refreshToken,
      )
    ) {
      throw new UnauthorizedException('Refresh token is blacklisted');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        },
      );

      const user = await this.userService.findUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(
        plainToInstance(UserResponseDto, user, {
          excludeExtraneousValues: true,
        }),
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(
    request,
    body: { refreshToken: string },
  ): Promise<{ message: string }> {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      const refreshToken = body.refreshToken;
      if (!token) {
        throw new UnauthorizedException('No access token provided');
      }
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const expiresIn = payload.exp - Math.floor(Date.now() / 1000);
      if (expiresIn > 0) {
        await this.tokenBlacklistService.addToBlacklist(token, expiresIn);
      }
      const refreshExpiresIn =
        refreshPayload.exp - Math.floor(Date.now() / 1000);
      if (refreshExpiresIn > 0) {
        await this.tokenBlacklistService.addToBlacklist(
          refreshToken,
          refreshExpiresIn,
        );
      }
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
