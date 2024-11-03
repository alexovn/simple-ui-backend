# Backend for blog on Nest.js

Backend for blog based on simple and great technologies.

Tech stack:

 - [Nest.js](https://nestjs.com/);
 - [pnpm](https://pnpm.io/);
 - [Prisma ORM](https://www.prisma.io/);
 - [PostgreSQL](https://www.postgresql.org/);
 - [Passport](https://www.passportjs.org/);
 - [bcrypt](https://github.com/kelektiv/node.bcrypt.js);
 - [Swagger](https://swagger.io/).

## Project setup

Copy variables to .env and fill them with your own data

```bash
$ cp -v .env.example .env
```

Install dependencies

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start
```

```bash
# watch mode
$ pnpm run start:dev
```

```bash
# production mode
$ pnpm run start:prod
```

## Swagger

http://localhost:3000/api