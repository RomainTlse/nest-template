import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un user' })
  @ApiResponse({
    status: 201,
    description: 'User créé avec succès',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Afficher tous les users' })
  @ApiResponse({
    status: 200,
    description: 'Liste des users',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher le user' })
  @ApiResponse({
    status: 200,
    description: 'User id',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier le user' })
  @ApiResponse({
    status: 200,
    description: 'User modifié avec succès',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer le user' })
  @ApiResponse({
    status: 200,
    description: 'User supprimé avec succès',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
