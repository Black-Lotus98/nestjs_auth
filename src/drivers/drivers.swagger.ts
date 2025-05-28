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
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverResponseDto } from './dto/driver-response.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

export function ApiDriverTag() {
  return ApiTags('driver');
}

export function CreateDriverSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new driver',
      description:
        'Create a new driver with the given name, last name, email, and password.',
    }),
    ApiCreatedResponse({
      description: 'The driver has been successfully created.',
      type: DriverResponseDto,
    }),
    ApiNotFoundResponse({ description: 'The driver has not been created.' }),
    ApiBody({ type: CreateDriverDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllDriversSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all drivers',
      description:
        'Retrieve a paginated and filtered list of all drivers. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of drivers',
      type: [DriverResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No drivers found matching the criteria',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'Driver is not authenticated' }),
    ApiForbiddenResponse({
      description: 'Driver does not have permission to access this resource',
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

export function GetDriverByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get driver by ID',
      description: 'Retrieve a driver by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Driver found',
      type: [DriverResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Driver not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Driver ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateDriverSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update driver by ID',
      description: "Update a driver's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Driver updated',
      type: [DriverResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Driver not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'User ID' }),
    ApiBody({ type: UpdateDriverDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteDriverSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete driver by ID',
      description: 'Delete a driver by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Driver deleted' }),
    ApiNotFoundResponse({ description: 'Driver not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Driver ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetDriverByNationalIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get driver by national ID',
      description: 'Retrieve a driver by their national ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Driver found',
      type: [DriverResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Driver not found' }),
    ApiParam({
      name: 'nationalId',
      type: 'string',
      description: 'Driver national ID',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
