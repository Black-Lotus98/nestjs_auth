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
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentResponseDto } from './dto/document-response.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

export function ApiDocumentTag() {
  return ApiTags('document');
}

export function CreateDocumentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new document',
      description: 'Create a new document with the given details.',
    }),
    ApiCreatedResponse({
      description: 'The document has been successfully created.',
      type: DocumentResponseDto,
    }),
    ApiNotFoundResponse({ description: 'The document has not been created.' }),
    ApiBody({ type: CreateDocumentDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function GetAllDocumentsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all documents',
      description:
        'Retrieve a paginated and filtered list of all documents. Supports sorting, filtering, and pagination.',
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of documents',
      type: [DocumentResponseDto],
    }),
    ApiNotFoundResponse({
      description: 'No documents found matching the criteria',
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

export function GetDocumentByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get document by ID',
      description: 'Retrieve a document by their unique ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Document found',
      type: DocumentResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Document not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UpdateDocumentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update document by ID',
      description: "Update a document's information by their unique ID.",
    }),
    ApiResponse({
      status: 200,
      description: 'Document updated',
      type: DocumentResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Document not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document ID' }),
    ApiBody({ type: UpdateDocumentDto }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function DeleteDocumentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete document by ID',
      description: 'Delete a document by their unique ID.',
    }),
    ApiResponse({ status: 200, description: 'Document deleted' }),
    ApiNotFoundResponse({ description: 'Document not found' }),
    ApiParam({ name: 'id', type: 'string', description: 'Document ID' }),
    ApiBearerAuth('JWT-auth'),
  );
}
