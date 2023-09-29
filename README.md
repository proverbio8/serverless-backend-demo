# AWS Lambdas

This repository contains a number of lambdas services using Typescript and Serverless framework, including the Tag validator function.

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.18.x)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Testing
This repository runs unit tests as well as integration tests using serverless offline.
- Run `npm test`

## Documentation
This repository uses Swagger to document available functions. Please refer to /docs/index.html or visit the Github page
