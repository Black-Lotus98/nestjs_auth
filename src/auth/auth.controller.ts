import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { LocalGuard } from 'src/common/guards/local.guard';
import { ApiLogin, ApiLogout, ApiGetUserInfo } from './auth.swager';
import { Response } from 'express';
import { Cookies } from 'src/common/decorators/cookies.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  @ApiLogin()
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(authDto, res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Cookies('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @ApiLogout()
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @ApiGetUserInfo()
  @UseGuards(JwtGuard)
  getUserInfo(@Req() request) {
    return request.user;
  }
}
