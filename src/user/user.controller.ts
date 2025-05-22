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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  DeleteUserSwagger,
  GetAllUsersSwagger,
  GetUserByEmailSwagger,
  GetUserByIdSwagger,
  GetUserByUsernameSwagger,
  UpdateUserSwagger,
} from './user.swagger';
import { CreateUserSwagger } from './user.swagger';
import { UserFilterDto } from './dto/user-filter.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permission } from 'src/common/enums/permission.enum';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
@UseGuards(JwtGuard, PermissionsGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Permissions(Permission.USER_CREATE)
  @CreateUserSwagger()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Permissions(Permission.USER_READ)
  @GetAllUsersSwagger()
  findAll(@Query() filter: UserFilterDto) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @Permissions(Permission.USER_READ)
  @GetUserByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  @Permissions(Permission.USER_READ)
  @GetUserByEmailSwagger()
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get('username/:username')
  @Permissions(Permission.USER_READ)
  @GetUserByUsernameSwagger()
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }

  @Patch(':id')
  @Permissions(Permission.USER_UPDATE)
  @UpdateUserSwagger()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(Permission.USER_DELETE)
  @DeleteUserSwagger()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
