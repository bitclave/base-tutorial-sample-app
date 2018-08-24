# Base Application Starter - Angular

This reference application demonstrates how to use BASE platform using [BASE auth sdk](https://github.com/bitclave/base-auth-sdk)

## Points of Interest
- uses **Login** widget from [BASE auth frontend](https://github.com/bitclave/base-auth-frontend)
- allows user to create his BASE account by choosing a passphrase
- passphrase will be used to create his private & public key pair
- user can encrypt his data using his private key and save data in BASE
- frontend is Angular, generated using [Angular-CLI](https://github.com/angular/angular-cli)

## Setup Steps
- install brew/windows equivelent
- install node/npm ```brew install node```
- install angular-cli via npm ```sudo npm i -g angular-cli```
- from project root run ```npm i``` to install project dependencies
- run ```npm run start``` to create local build + start development server at localhost:4200


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Troubleshooting

If you run into any node-sass npm issues during install/build process, run ```npm rebuild node-sass``` and then re-run install/build command

If you run into issues with Angular, try to install a sample project from https://angular.io/tutorial/toh-pt0 and run ng build
