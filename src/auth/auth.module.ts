import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenBlacklistService } from './token-blacklist.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({}), RedisModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, TokenBlacklistService],
  exports: [AuthService],
})
export class AuthModule {}
