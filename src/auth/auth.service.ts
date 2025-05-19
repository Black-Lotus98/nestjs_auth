import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
}
