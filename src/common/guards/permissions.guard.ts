import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/auth/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Get all permissions (direct and from roles)
    const allPermissions = [
      ...(user.permissions || []),
      ...(user.roles || []).flatMap((role) => role.permissions || []),
    ];

    if (allPermissions.length === 0) {
      throw new UnauthorizedException('User has no permissions assigned');
    }

    console.log('requiredPermissions', requiredPermissions);
    console.log('allPermissions', allPermissions);
    // Check if user has all required permissions
    return requiredPermissions.every((requiredPermission) =>
      allPermissions.some(
        (permission) => permission.code === requiredPermission,
      ),
    );
  }
}
