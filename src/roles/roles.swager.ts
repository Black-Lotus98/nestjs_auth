import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RoleResponseDto } from './dto/roles-response.dto';

export function GetAllRolesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all roles',
      description:
        'Retrieve a paginated and filtered list of all roles. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of roles',
      type: [RoleResponseDto],
    }),
    ApiNotFoundResponse({ description: 'The role has not been created.' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetRoleByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a role by ID',
      description: 'Retrieve a role by its unique identifier.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved role',
      type: RoleResponseDto,
    }),
    ApiNotFoundResponse({ description: 'The role has not been found.' }),
    ApiBearerAuth('JWT-auth'),
  );
}
