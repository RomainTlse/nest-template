import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profil } from './entities/profil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilService {
  private readonly logger = new Logger(ProfilService.name);

  constructor(
    @InjectRepository(Profil)
    private _profilRepository: Repository<Profil>,
  ) {}

  /**
   * Create profil
   * @param createProfilDto
   */
  async create(createProfilDto: CreateProfilDto): Promise<Profil> {
    try {
      const profil = new Profil();
      profil.name = createProfilDto.name;
      return await this._profilRepository.save(
        profil,
        //this._profilRepository.create(profil),
      );
    } catch (error) {
      this.logger.error('Creating profil', error);
      console.error('Error creating profil', error);
      throw new HttpException('Error creating profil', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all profils
   */
  async findAll() {
    try {
      return await this._profilRepository.find();
    } catch (error) {
      console.error('Error creating profil', error);
      throw new HttpException('Error creating profil', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find profil by id
   * @param id
   */
  async findOne(id: number): Promise<Profil> {
    try {
      const profil = await this._profilRepository.findOneBy({ id });
      if (!profil) {
        throw new HttpException(
          `Profil with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return profil;
    } catch (error) {
      console.error('Error find by id profil', error);
      throw new HttpException(
        `Error find by id profil`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Update profil by id
   * @param id
   * @param updateProfilDto
   */
  async update(id: number, updateProfilDto: UpdateProfilDto) {
    const profil = await this._profilRepository.findOneBy({ id });
    if (!profil) {
      throw new HttpException(
        `Profil with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this._profilRepository.update(id, updateProfilDto);
      return this.findOne(id);
    } catch (error) {
      console.error('Error updating Profil:', error);
      throw new HttpException(
        `Error updating Profil ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    const profil = await this._profilRepository.findOneBy({ id });
    if (!profil) {
      throw new HttpException(
        `Profil with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this._profilRepository.delete(id);
      return id;
    } catch (error) {
      console.error('Error remove Profil:', error);
      throw new HttpException(
        `Error remove Profil ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
