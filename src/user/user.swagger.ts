export class UserSwagger {}
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { FilterDto } from '../common/dto/filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from 'src/common/responses/user.response';

export function ApiUserTag() {
  return ApiTags('user');
}

export function CreateUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description:
        'Create a new user with the given name, last name, email, and password.',
    }),
    ApiCreatedResponse({
      description: 'The user has been successfully created.',
      type: UserResponse,
    }),
    ApiNotFoundResponse({ description: 'The user has not been created.' }),
    ApiBody({ type: CreateUserDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllUsersSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users',
      description:
        'Retrieve a paginated and filtered list of all users. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of users',
      type: [UserResponse],
    }),
    ApiNotFoundResponse({
      description: 'No users found matching the criteria',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated' }),
    ApiForbiddenResponse({
      description: 'User does not have permission to access this resource',
    }),
    ApiQuery({
      name: 'filter',
      type: FilterDto,
      required: false,
      description: 'Filter and pagination options',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetUserByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by ID',
      description: 'Retrieve a user by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'User found',
      type: [UserResponse],
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user by ID',
      description: "Update a user's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'User updated',
      type: [UserResponse],
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiBody({ type: UpdateUserDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user by ID',
      description: 'Delete a user by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'User deleted' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetUserByEmailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by email',
      description: 'Retrieve a user by their email address.',
    }),
    ApiResponse({
      status: 200,
      description: 'User found',
      type: [UserResponse],
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiParam({ name: 'email', type: 'string', description: 'User email' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetUserByUsernameSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by username',
      description: 'Retrieve a user by their username.',
    }),
    ApiResponse({
      status: 200,
      description: 'User found',
      type: [UserResponse],
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiParam({
      name: 'username',
      type: 'string',
      description: 'User username',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
