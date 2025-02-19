import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'P@ssw0rd!',
  database: 'template',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [
    __dirname + '/src/migrations/**/*{.ts,.js}', // Adapté pour TypeScript et JavaScript
  ],
  synchronize: false, // Il est recommandé de ne pas utiliser synchronize en production
  logging: true,
});
