import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateTailingRecordDto } from './dto/create-tailing-record.dto';
import { TailingRecordResponseDto } from './dto/tailing-record-response.dto';
import { UpdateTailingRecordDto } from './dto/update-tailing-record.dto';

export function ApiTailingRecordTag() {
  return ApiTags('tailing-record');
}

export function CreateTailingRecordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new tailing record',
      description: 'Create a new tailing record with the given information.',
    }),
    ApiCreatedResponse({
      description: 'The tailing record has been successfully created.',
      type: TailingRecordResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'The tailing record has not been created.',
    }),
    ApiBody({ type: CreateTailingRecordDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllTailingRecordsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tailing records',
      description: 'Retrieve a list of all tailing records.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of tailing records',
      type: [TailingRecordResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No tailing records found',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated' }),
    ApiForbiddenResponse({
      description: 'User does not have permission to access this resource',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetTailingRecordByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get tailing record by ID',
      description: 'Retrieve a tailing record by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Tailing record found',
      type: TailingRecordResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Tailing record not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing record ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateTailingRecordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update tailing record by ID',
      description: "Update a tailing record's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Tailing record updated',
      type: TailingRecordResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Tailing record not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing record ID' }),
    ApiBody({ type: UpdateTailingRecordDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteTailingRecordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete tailing record by ID',
      description: 'Delete a tailing record by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Tailing record deleted' }),
    ApiNotFoundResponse({ description: 'Tailing record not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing record ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}
