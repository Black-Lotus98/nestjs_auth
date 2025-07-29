export class PhoneSwagger {}
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
import { CreatePhoneDto } from './dto/create-phone.dto';
import { PhoneResponse } from './dto/phones-response.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

export function ApiPhoneTag() {
  return ApiTags('phone');
}

export function CreatePhoneSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new phone',
      description:
        'Create a new phone with the given phone number, phone type, and is primary.',
    }),
    ApiCreatedResponse({
      description: 'The phone has been successfully created.',
      type: PhoneResponse,
    }),
    ApiNotFoundResponse({ description: 'The phone has not been created.' }),
    ApiBody({ type: CreatePhoneDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllPhonesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all phones',
      description:
        'Retrieve a paginated and filtered list of all phones. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of phones',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({
      description: 'No phones found matching the criteria',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated' }),
    ApiForbiddenResponse({
      description: 'Phone does not have permission to access this resource',
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

export function GetPhoneByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get phone by ID',
      description: 'Retrieve a phone by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Phone found',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({ description: 'Phone not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Phone ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdatePhoneSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update phone by ID',
      description: "Update a phone's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Phone updated',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({ description: 'Phone not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Phone ID' }),
    ApiBody({ type: UpdatePhoneDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeletePhoneSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete phone by ID',
      description: 'Delete a phone by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Phone deleted' }),
    ApiNotFoundResponse({ description: 'Phone not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Phone ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetPhoneByPhoneNumberSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get phone by phone number',
      description: 'Retrieve a phone by their phone number.',
    }),
    ApiResponse({
      status: 200,
      description: 'Phone found',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({ description: 'Phone not found' }),
    ApiParam({
      name: 'phoneNumber',
      type: 'string',
      description: 'Phone number',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetPhoneByPhoneTypeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get phone by phone type',
      description: 'Retrieve a phone by their phone type.',
    }),
    ApiResponse({
      status: 200,
      description: 'Phone found',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({ description: 'Phone not found' }),
    ApiParam({
      name: 'phoneType',
      type: 'string',
      description: 'Phone type',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetPhoneByUserIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get phone numbers by user ID',
      description: 'Retrieve all phone numbers by their user ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Phone numbers found',
      type: [PhoneResponse],
    }),
    ApiNotFoundResponse({ description: 'No phone numbers found' }),
    ApiParam({ name: 'user_id', type: 'string', description: 'User ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}
