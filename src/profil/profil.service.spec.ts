import { Test, TestingModule } from '@nestjs/testing';
import { ProfilService } from './profil.service';
import { Profil } from './entities/profil.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ProfilService', () => {
  let service: ProfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'P@ssw0rd!', // Remplacez par vos informations d'identification
          database: 'template',
          entities: [Profil],
          synchronize: false,
          logging: true,
        }),
        TypeOrmModule.forFeature([Profil]), // Assurez-vous que Profil est bien inclus ici
      ],
      providers: [ProfilService],
    }).compile();

    service = module.get<ProfilService>(ProfilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
