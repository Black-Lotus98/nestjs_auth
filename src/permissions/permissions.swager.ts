import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PermissionResponseDto } from './dto/permission-response.dto';

export function GetAllPermissionsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all permissions',
      description:
        'Retrieve a paginated and filtered list of all permissions. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of permissions',
      type: [PermissionResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'The permission has not been created.',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetPermissionByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a permission by ID',
      description: 'Retrieve a permission by its unique identifier.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved permission',
      type: PermissionResponseDto,
    }),
    ApiNotFoundResponse({ description: 'The permission has not been found.' }),
    ApiBearerAuth('JWT-auth'),
  );
}
