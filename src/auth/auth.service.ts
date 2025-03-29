import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Profil } from '../profil/entities/profil.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
    private readonly _mailerService: MailerService,
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    @InjectRepository(Profil)
    private profilRepository: Repository<Profil>,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this._userService.findOneByMail(loginDto.email);
    if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this._jwtService.signAsync(payload),
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this._userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        console.error('Email already in use');
        throw new ConflictException('Email already in use');
      }
      const profil = await this.profilRepository.findOne({
        where: { id: 2 },
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

  async sendPasswordResetEmail(user: User, resetToken: string): Promise<void> {
    const resetLink = `http://localhost:4200/new-password?token=${resetToken}`;

    await this._mailerService.sendMail({
      to: user.email, // L'adresse e-mail de l'utilisateur
      subject: 'Réinitialisation de votre mot de passe',
      template: 'reset-password', // Nom du template que tu veux utiliser
      context: {
        name: user.firstname + ' ' + user.lastname,
        resetLink,
      },
    });
  }
}
