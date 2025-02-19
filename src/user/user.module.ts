import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profil } from '../profil/entities/profil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profil])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
