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
import { CreateInspectionDetailDto } from './dto/create-inspection-detail.dto';
import { InspectionDetailResponseDto } from './dto/inspection-detail-response.dto';
import { UpdateInspectionDetailDto } from './dto/update-inspection-detail.dto';

export function ApiInspectionDetailTag() {
  return ApiTags('inspection-detail');
}

export function CreateInspectionDetailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new inspection detail',
      description: 'Create a new inspection detail with the given information.',
    }),
    ApiCreatedResponse({
      description: 'The inspection detail has been successfully created.',
      type: InspectionDetailResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'The inspection detail has not been created.',
    }),
    ApiBody({ type: CreateInspectionDetailDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllInspectionDetailsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all inspection details',
      description: 'Retrieve a list of all inspection details.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of inspection details',
      type: [InspectionDetailResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No inspection details found',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters provided' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated' }),
    ApiForbiddenResponse({
      description: 'User does not have permission to access this resource',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetInspectionDetailByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get inspection detail by ID',
      description: 'Retrieve an inspection detail by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Inspection detail found',
      type: InspectionDetailResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Inspection detail not found' }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Inspection detail ID',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateInspectionDetailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update inspection detail by ID',
      description:
        "Update an inspection detail's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Inspection detail updated',
      type: InspectionDetailResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Inspection detail not found' }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Inspection detail ID',
    }),
    ApiBody({ type: UpdateInspectionDetailDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteInspectionDetailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete inspection detail by ID',
      description: 'Delete an inspection detail by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Inspection detail deleted' }),
    ApiNotFoundResponse({ description: 'Inspection detail not found' }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Inspection detail ID',
    }),
    ApiBearerAuth('JWT-auth'),
  );
}
