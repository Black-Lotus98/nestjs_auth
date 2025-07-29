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
import { CreateTailingGradeDto } from './dto/create-tailing-grade.dto';
import { TailingGradeResponseDto } from './dto/tailing-grade-response.dto';
import { UpdateTailingGradeDto } from './dto/update-tailing-grade.dto';

export function ApiTailingGradeTag() {
  return ApiTags('tailing-grade');
}

export function CreateTailingGradeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new tailing grade',
      description: 'Create a new tailing grade with the given information.',
    }),
    ApiCreatedResponse({
      description: 'The tailing grade has been successfully created.',
      type: TailingGradeResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'The tailing grade has not been created.',
    }),
    ApiBody({ type: CreateTailingGradeDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllTailingGradesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tailing grades',
      description: 'Retrieve a list of all tailing grades.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of tailing grades',
      type: [TailingGradeResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No tailing grades found',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated' }),
    ApiForbiddenResponse({
      description: 'User does not have permission to access this resource',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetTailingGradeByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get tailing grade by ID',
      description: 'Retrieve a tailing grade by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Tailing grade found',
      type: TailingGradeResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Tailing grade not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing grade ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateTailingGradeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update tailing grade by ID',
      description: "Update a tailing grade's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Tailing grade updated',
      type: TailingGradeResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Tailing grade not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing grade ID' }),
    ApiBody({ type: UpdateTailingGradeDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteTailingGradeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete tailing grade by ID',
      description: 'Delete a tailing grade by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Tailing grade deleted' }),
    ApiNotFoundResponse({ description: 'Tailing grade not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Tailing grade ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}
