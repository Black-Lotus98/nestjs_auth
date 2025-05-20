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
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
// @UseGuards(AccessTokenGuard)
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateUserSwagger()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @GetAllUsersSwagger()
  findAll(@Query() filter: UserFilterDto) {
    return this.userService.findAll(filter);
  }

  @Get(':id')
  @GetUserByIdSwagger()
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('email/:email')
  @GetUserByEmailSwagger()
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get('username/:username')
  @GetUserByUsernameSwagger()
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }

  @Patch(':id')
  @UpdateUserSwagger()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @DeleteUserSwagger()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
