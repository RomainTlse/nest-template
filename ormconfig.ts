module.exports = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'P@ssw0rd!',
  database: 'template',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false, // Ne jamais utiliser en production
};
