import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    }
    return null;
  }

  async login(authDto: AuthDto, res: Response): Promise<AuthResponseDto> {
    const user = await this.validateUser(authDto.email, authDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // Set access token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      user,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const userDto = plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });

      const newPayload = { email: user.email, sub: user.id };
      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      return {
        user: userDto,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  logout(res: Response) {
    // Clear both tokens
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
