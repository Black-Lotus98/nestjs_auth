import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DocumentTypesService } from './document-types.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import {
  CreateDocumentTypeSwagger,
  DeleteDocumentTypeSwagger,
  GetAllDocumentTypesSwagger,
  GetDocumentTypeByIdSwagger,
  UpdateDocumentTypeSwagger,
} from './document-types.swagger';
import { DocumentTypeFilterDto } from './dto/document-type-filter.dto';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('document-types')
@UseGuards(JwtGuard, PermissionsGuard)
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}

  @Post()
  @Permissions(Permission.DOCUMENT_TYPE_CREATE)
  @CreateDocumentTypeSwagger()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypesService.create(createDocumentTypeDto);
  }

  @Get()
  @Permissions(Permission.DOCUMENT_TYPE_READ)
  @GetAllDocumentTypesSwagger()
  findAll(@Query() filter: DocumentTypeFilterDto) {
    return this.documentTypesService.findAll(filter);
  }

  @Get(':id')
  @Permissions(Permission.DOCUMENT_TYPE_READ)
  @GetDocumentTypeByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.documentTypesService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.DOCUMENT_TYPE_UPDATE)
  @UpdateDocumentTypeSwagger()
  update(
    @Param('id') id: string,
    @Body() updateDocumentTypeDto: UpdateDocumentTypeDto,
  ) {
    return this.documentTypesService.update(id, updateDocumentTypeDto);
  }

  @Delete(':id')
  @Permissions(Permission.DOCUMENT_TYPE_DELETE)
  @DeleteDocumentTypeSwagger()
  remove(@Param('id') id: string) {
    return this.documentTypesService.remove(id);
  }
}
