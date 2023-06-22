# NestJs Template (Graphql+Mongoose version)

This is a starter template for project that needs nestJS backend. This version uses graphql and mongoose with mongodb. This follows best practice that is mentioned at the [NestJS documentation](https://docs.nestjs.com/graphql/quick-start). This package handled authentication using `@nestjs/jwt` and seeding is handled by `nestjs-seeder`.

# Guidelines

## running project

first run this script:

`npm i`

then after verifying that your database is running and env file (please refer to _sample.env_) is ready you may build the project with:

`npm run build`

and run this project with this script:

`npm run start:dev`

## seed

before starting seeding procedure make sure your project is built, then register an account for yourself, get the hashed password, go to user schema and finally update

    `@Factory(
    '$2b$10$/3sioxoWNCCo3g/efr.cXuuXNvUWcPJM/PoBmKNVcHTaXtvgASF7C', // You have to make change here
    )`

this is going to be default password for all seed users.
finally run this script:

`npm run seed`
