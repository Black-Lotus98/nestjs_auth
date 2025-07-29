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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {
  CreateDocumentSwagger,
  DeleteDocumentSwagger,
  GetAllDocumentsSwagger,
  GetDocumentByIdSwagger,
  UpdateDocumentSwagger,
} from './documents.swagger';
import { DocumentFilterDto } from './dto/document-filter.dto';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('documents')
@UseGuards(JwtGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Permissions(Permission.DOCUMENT_CREATE)
  @CreateDocumentSwagger()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @Permissions(Permission.DOCUMENT_READ)
  @GetAllDocumentsSwagger()
  findAll(@Query() filter: DocumentFilterDto) {
    return this.documentsService.findAll(filter);
  }

  @Get(':id')
  @Permissions(Permission.DOCUMENT_READ)
  @GetDocumentByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @Permissions(Permission.DOCUMENT_UPDATE)
  @UpdateDocumentSwagger()
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Permissions(Permission.DOCUMENT_DELETE)
  @DeleteDocumentSwagger()
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
