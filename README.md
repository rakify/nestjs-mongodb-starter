# NestJs Template (Graphql version)

This is a starter template for project that needs nestJS backend. This version uses graphql and typeorm with mysql. This follows best practice that is mentioned at the [NestJS documentation](https://docs.nestjs.com/graphql/quick-start). This package handled authentication using `@nestjs/jwt` and seeding is handled by `nestjs-seeder`.

# Guidelines

## running project

first run this script:

`npm i`

then after verifying that your database is running and env file (please refer to _sample.env_) is ready you may build the project with:

`npm run build`

and run this project with this script:

`npm run start:dev`

## migration

to generate migration file make sure your project is built first using this script,

`npm run build`

then run this script:

`npm run migration-gen`

then build project with new migration file by running this script:

`npm run build`

now you can run migration file using this script:

`npm run migration-run`

## seed

before starting seeding procedure make sure your migration run is successful and project is built, then run this script:

`npm run seed`

All seed users has a default password that is : **1234**

## drop schema

to drop all database and go back to the stage after migration-run, run this script:

`npm run schema-drop`
