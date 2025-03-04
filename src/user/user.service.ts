import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profil } from '../profil/entities/profil.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    @InjectRepository(Profil)
    private profilRepository: Repository<Profil>,
  ) {}

  /**
   * Create new user
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this._userRepository.findOne({
        where: { mail: createUserDto.mail },
      });
      if (existingUser) {
        console.error('Email already in use');
        throw new ConflictException('Email already in use');
      }

      const profil = await this.profilRepository.findOne({
        where: { id: createUserDto.profil.id },
      });
      if (!profil) {
        console.error('Profil not found');
        throw new Error('Profil not found');
      }

      return await this._userRepository.save(
        this._userRepository.create({
          ...createUserDto,
          profil,
        }),
      );
    } catch (error) {
      console.error('Error creating User:', error);
      throw new HttpException('Error creating User', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    try {
      return await this._userRepository.find({ relations: ['profil'] });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      throw new Error('Impossible de récupérer les utilisateurs.');
    }
  }

  /**
   * Find user by id
   * @param id
   */
  async findOne(id: number): Promise<User> {
    try {
      const user = await this._userRepository.findOne({
        where: { id },
        relations: ['profil'],
      });
      if (!user) {
        console.error(`User with id ${id} not found.`);
        throw new HttpException(
          `User with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.error('Get one user by id error: ', error);
      throw new HttpException(
        `Get one user by id error`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Update user by id
   * @param id
   * @param updateUserDto
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this._userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    const profil = await this.profilRepository.findOne({
      where: { id: updateUserDto.profil?.id },
    });
    if (!profil) {
      console.error('Profil not found');
      throw new Error('Profil not found');
    }

    try {
      // Mise à jour de l'utilisateur en utilisant `update()`.
      await this._userRepository.update(id, {
        ...updateUserDto,
        profil,
      });

      // Retourner l'entité mise à jour
      return this._userRepository.findOne({
        where: { id },
        relations: ['profil'],
      });
    } catch (error) {
      console.error('Error updating User:', error);
      throw new HttpException(
        `Error updating User ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Delete user byId
   * @param id
   */
  async remove(id: number): Promise<number> {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this._userRepository.delete(id);
      return id;
    } catch (error) {
      console.error('Error remove User:', error);
      throw new HttpException(
        `Error remove User ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
