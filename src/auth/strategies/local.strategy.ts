import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      this.logger.debug(`Attempting to validate user with email: ${email}`);
      const user = await this.authService.validateUser({ email, password });

      if (!user) {
        this.logger.warn(`Failed login attempt for email: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.debug(`Successfully validated user: ${email}`);
      return user;
    } catch (error) {
      this.logger.error(`Error during authentication: ${error.message}`);
      throw error;
    }
  }
}
