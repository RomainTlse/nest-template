## create the project

```
$ npm i -g @nestjs/cli
$ nest new nest-template
```

## Quality

`npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/commit-analyzer @semantic-release/release-notes-generator`

`.releaserc`

```
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/git"
  ]
}
```

`npm install --save-dev @commitlint/cli`
`npm install --save-dev @commitlint/config-conventional`
`echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js`
`npm install --save-dev commitizen cz-customizable`
`package.json`

```
"scripts": {
  "commit": "git-cz"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```

`.cz-config.js`

```
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Une nouvelle fonctionnalité' },
    { value: 'fix', name: 'fix:      Correction d\'un bug' },
    { value: 'docs', name: 'docs:     Documentation' },
    { value: 'style', name: 'style:    Modifications de formatage (pas de code fonctionnel)' },
    { value: 'refactor', name: 'refactor: Refactoring de code' },
    { value: 'perf', name: 'perf:     Amélioration des performances' },
    { value: 'test', name: 'test:     Ajout de tests' },
    { value: 'chore', name: 'chore:    Modifications mineures (outils, configuration)' },
    { value: 'revert', name: 'revert:   Revertir un commit précédent' }
  ],
  messages: {
    type: "Quel type de changement avez-vous effectué ?",
    subject: "Quelle est la portée de votre changement ?"
  }
};
```

`npm install husky --save-dev`

`.husky/commit-msg`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

`.husky/pre-commit`

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
npm run lint
```

`chmod +x .husky/*`

pour commiter :

`npx git-cz`

Pour faire une release :

`npx semantic-release`

## CI

### create the files `.github/workflows/ci.yml`

```
name: CI
on:
  push:
    branches:
      - develop
  pull_request:
    branches:
      - develop
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 20.x ] # Remplace par la version de Node.js que tu utilises.

    steps:
      - name: Checkout repository ⬇️
        uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }} 👷
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies ⚙️
        run: npm install

      - name: Run tests ✅
        run: npm run test

      - name: Build project 🛠
        run: npm run build

```

## Mysql / type ORM

`npm i -g typeorm`
`npm install ts-node --save-dev`
`npm install --save @nestjs/typeorm typeorm mysql2`

`ormconfig.json`

```json
  "type": "mysql",
"host": "mysql",
"port": 3306,
"username": "root",
"password": "P@ssw0rd!",
"database": "template",
"entities": [
"dist/**/*.entity{.ts,.js}"
],
"synchronize": false
}
```

`.env`

```
MYSQL_ROOT_PASSWORD=P@ssw0rd!
MYSQL_DATABASE=template
MYSQL_HOST=mysql
```

## Docker

`docker-compose.yml`

```
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - nestjs-network

  nestjs:
    build: .
    container_name: nestjs-container
    ports:
      - "3030:3000"
    depends_on:
      - mysql
    networks:
      - nestjs-network
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USERNAME: root
      DB_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      DB_DATABASE: ${MYSQL_DATABASE}

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin-container
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "8080:80"
    networks:
      - nestjs-network
    depends_on:
      - mysql

volumes:
  mysql_data:

networks:
  nestjs-network:
    driver: bridge

```

`Dockerfile`

```
# Utiliser l'image officielle Node.js
FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]

```

docker-compose up --build

migration
npx typeorm migration:generate .\src\migrations\addUser -d .\dist\data-source.js

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it
runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more
information.

If you are looking for a cloud-based platform to deploy your NestJS application, check
out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment
straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than
managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time
  using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our
  official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework)
  and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If
you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
