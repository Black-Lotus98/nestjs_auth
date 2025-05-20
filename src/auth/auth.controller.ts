import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { LocalGuard } from 'src/common/guards/local.guard';
import { ApiLogin, ApiLogout, ApiGetUserInfo } from './auth.swager';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @ApiLogin()
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @ApiLogout()
  async logout(@Req() request) {
    return this.authService.logout(request);
  }

  @Get('me')
  @ApiGetUserInfo()
  @UseGuards(JwtGuard)
  getUserInfo(@Req() request) {
    return request.user;
  }
}
