import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de gestion des utilisateurs et profils')
    .setDescription(
      "Documentation de l'API pour gérer les utilisateurs et leurs profils",
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('profiles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document); // L'URL de Swagger sera disponible sur /api

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200', // URL de votre frontend Angular
    methods: 'GET, POST, PUT, DELETE, PATCH', // Méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Authorization', // Entêtes autorisées
    credentials: true, // Autoriser l'envoi de cookies (si nécessaire)
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
