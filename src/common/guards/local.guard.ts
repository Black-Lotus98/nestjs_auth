import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (!email || !password) {
      this.logger.error('Missing credentials in request body');
      throw new UnauthorizedException('Email and password are required');
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error('Authentication failed:', {
        error: err?.message,
        info: info?.message,
        user: user ? 'exists' : 'not found',
      });
      throw err || new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
