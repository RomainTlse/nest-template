import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilModule } from './profil/profil.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'node:path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mailhog', // Hôte SMTP de MailHog
        port: 1025, // Port SMTP de MailHog
        secure: false, // Ne pas utiliser SSL/TLS (MailHog ne l'utilise pas)
      },
      defaults: {
        from: '"No Reply" <noreply@template.com>', // L'adresse de l'expéditeur par défaut
      },
      template: {
        dir: path.join(__dirname, 'templates'), // Répertoire des templates d'email
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd!', // Remplacez par vos informations d'identification
      database: 'template',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    UserModule,
    ProfilModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
