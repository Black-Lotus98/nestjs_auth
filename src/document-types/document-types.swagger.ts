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
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { DocumentTypeResponseDto } from './dto/document-type-response.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';

export function ApiDocumentTypeTag() {
  return ApiTags('document-type');
}

export function CreateDocumentTypeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new document type',
      description:
        'Create a new document type with the given type and description.',
    }),
    ApiCreatedResponse({
      description: 'The document type has been successfully created.',
      type: DocumentTypeResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'The document type has not been created.',
    }),
    ApiBody({ type: CreateDocumentTypeDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllDocumentTypesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all document types',
      description:
        'Retrieve a paginated and filtered list of all document types. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of document types',
      type: [DocumentTypeResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No document types found matching the criteria',
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

export function GetDocumentTypeByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get document type by ID',
      description: 'Retrieve a document type by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Document type found',
      type: DocumentTypeResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Document type not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document type ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateDocumentTypeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update document type by ID',
      description: "Update a document type's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Document type updated',
      type: DocumentTypeResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Document type not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document type ID' }),
    ApiBody({ type: UpdateDocumentTypeDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteDocumentTypeSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete document type by ID',
      description: 'Delete a document type by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Document type deleted' }),
    ApiNotFoundResponse({ description: 'Document type not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document type ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}
