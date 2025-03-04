import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfilService } from './profil.service';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profil } from './entities/profil.entity';

@Controller('profil')
@ApiTags('profiles')
export class ProfilController {
  private readonly logger = new Logger(ProfilService.name);

  constructor(private readonly profilService: ProfilService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un profil' })
  @ApiResponse({
    status: 201,
    description: 'Profil créé avec succès',
    type: Profil,
  })
  create(@Body() createProfilDto: CreateProfilDto) {
    console.log(createProfilDto);
    this.logger.log('Creating profil', JSON.stringify(createProfilDto));
    return this.profilService.create(createProfilDto);
  }

  @Get()
  @ApiOperation({ summary: 'Afficher tous les profils' })
  @ApiResponse({
    status: 200,
    description: 'Liste des profils',
    type: [Profil],
  })
  findAll() {
    return this.profilService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher le profil' })
  @ApiResponse({
    status: 200,
    description: 'Profil id',
    type: Profil,
  })
  findOne(@Param('id') id: string) {
    return this.profilService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier le profil' })
  @ApiResponse({
    status: 200,
    description: 'Profil modifié avec succès',
    type: Profil,
  })
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilService.update(+id, updateProfilDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer le profil' })
  @ApiResponse({
    status: 200,
    description: 'Profil supprimé avec succès',
    type: Profil,
  })
  remove(@Param('id') id: string) {
    return this.profilService.remove(+id);
  }
}
