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
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { EmploymentResponseDto } from './dto/employment-response.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';

export function ApiEmploymentTag() {
  return ApiTags('employment');
}

export function CreateEmploymentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new employment',
      description:
        'Create a new employment with the given employee ID, start date, and end date.',
    }),
    ApiCreatedResponse({
      description: 'The employment has been successfully created.',
      type: EmploymentResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'The employment has not been created.',
    }),
    ApiBody({ type: CreateEmploymentDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllEmploymentsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all employments',
      description:
        'Retrieve a paginated and filtered list of all employments. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of employments',
      type: [EmploymentResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No employments found matching the criteria',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'Employment is not authenticated' }),
    ApiForbiddenResponse({
      description:
        'Employment does not have permission to access this resource',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'Employment is not authenticated' }),
    ApiForbiddenResponse({
      description:
        'Employment does not have permission to access this resource',
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

export function GetEmploymentByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get employment by ID',
      description: 'Retrieve an employment by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Employment found',
      type: [EmploymentResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Employment not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Employment ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateEmploymentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update employment by ID',
      description: "Update an employment's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Employment updated',
      type: [EmploymentResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Employment not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Employment ID' }),
    ApiBody({ type: UpdateEmploymentDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteEmploymentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete employment by ID',
      description: 'Delete an employment by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Employment deleted' }),
    ApiNotFoundResponse({ description: 'Employment not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Employment ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetEmploymentsByEmployeeIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get employments by employee ID',
      description: 'Retrieve employments by employee ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Employments found',
      type: [EmploymentResponseDto],
    }),
    ApiNotFoundResponse({ description: 'Employments not found' }),
    ApiParam({
      name: 'employeeId',
      type: 'string',
      description: 'Employee ID',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
