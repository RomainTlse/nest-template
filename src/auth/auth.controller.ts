import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this._authService.register(createUserDto);
  }

  @Post('forgot-pwd')
  async requestPasswordReset(@Body() forgotPassword: ForgotPasswordDto) {
    const user = await this._userService.findOneByMail(forgotPassword.email);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Générer un token unique pour la réinitialisation
    const token = crypto.randomBytes(32).toString('hex');

    // Enregistrer le token dans la base de données associé à l'utilisateur
    await this._userService.saveResetToken(user.id, token);

    // Envoyer l'email
    await this._authService.sendPasswordResetEmail(user, token);

    return {
      message: 'Un e-mail de réinitialisation de mot de passe a été envoyé.',
    };
  }

  @Post('new-pwd')
  async confirmResetPassword(@Body() newPasswordDto: NewPasswordDto) {
    // Vérifier le token et récupérer l'utilisateur
    const user = await this._userService.findByResetToken(newPasswordDto.token);

    if (!user) {
      throw new Error('Token invalide');
    }

    // Modifier le mot de passe de l'utilisateur
    await this._userService.updatePassword(user.id, newPasswordDto.password);

    return { message: 'Mot de passe modifié avec succès.' };
  }
}
