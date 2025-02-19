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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
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
        throw new ConflictException('Email already in use');
      }

      return await this._userRepository.save(
        this._userRepository.create(createUserDto),
      );
    } catch (error) {
      console.error('Error creating User:', error);
      if (error instanceof ConflictException) {
        console.error("l'utilisateur existe déjà");
        throw error; // Re-throw ConflictException pour être gérée par NestJS
      }
      throw new HttpException('Error creating User', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    try {
      return await this._userRepository.find();
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
      const user = await this._userRepository.findOneBy({ id });
      if (!user) {
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
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this._userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this._userRepository.update(id, updateUserDto);
      return this.findOne(id);
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
