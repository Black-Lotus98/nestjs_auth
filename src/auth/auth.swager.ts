import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    ApiTags('auth'),
    ApiOperation({ summary: 'Authentication endpoints' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiResponse({
      status: 200,
      description: 'Login successful',
      schema: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              username: { type: 'string' },
            },
          },
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Invalid credentials' }),
  );
}

export function ApiRefreshToken() {
  return applyDecorators(
    ApiOperation({ summary: 'Refresh access token' }),
    ApiResponse({
      status: 200,
      description: 'Token refresh successful',
      schema: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Invalid refresh token' }),
  );
}

export function ApiLogout() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'User logout' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          refreshToken: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'Logout successful' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function ApiGetUserInfo() {
  return applyDecorators(
    ApiBearerAuth('JWT-auth'),
    ApiOperation({ summary: 'Get current user information' }),
    ApiResponse({
      status: 200,
      description: 'User information retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          username: { type: 'string' },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
