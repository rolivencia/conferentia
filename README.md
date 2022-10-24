# Conferentia

Conferentia is a web-based platform used to manage academic, professional and community-driven conferences and events.

## Workspace structure

- `/apps` folder contains the source of all the apps in the workspace.
  - `/apps/app` folder contains the source code of an Ionic hybrid app, which can be deployed to multiple platforms, be it iOS, Android or as a PWA. This app provides the main user experience in the platform.
  - `/apps/api` folder contains the source code of a NestJS app that is used as the backend server for the platform. This app provides web services that interact with the Ionic app and the data sources.
  - `apps/studio` folder contains the local environment of Sanity Studio used to feed event-related data to the applications.
- `/libs` folder groups the TypeScript libraries used in the workspace.

## Scripts

### Development server

- `nx serve api`: executes NestJS server.
- `nx serve app`: executes Ionic app.

### Build apps

- `nx build api`: build NestJS server dist.
- `nx build app`: build Ionic app dist.

### Running unit tests

- `nx test api`: executes unit tests via Jest for NestJS server project.
- `nx test app`: executes unit tests via Jest for Ionic app project.

### Running end-to-end tests

- `nx e2e app` to execute the end-to-end tests in Ionic app via Cypress.
- `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Scaffolding

#### Generate modules, controllers and services in NestJS api project:

- `nx g @nrwl/nest:module --project=api`
- `nx g @nrwl/nest:controller --project=api`
- `nx g @nrwl/nest:service --project=api`

#### Generate modules, components and services in Ionic app project:

- `nx generate @nrwl/angular:module MyModule --project app`
- `nx generate @nrwl/angular:component MyComponent --project app`
- `nx generate @nrwl/angular:service MyService --project app`

#### Generate modules, components, etc. in lib project:

- `nx generate @nrwl/angular:interface MyInterface --project lib`
- `nx generate @nrwl/angular:component MyComponent --project lib`

Libraries are shareable across libraries and applications. They can be imported from `@conferentia/lib`.When using Nx, you can create multiple applications and libraries in the same workspace.

New libraries can be generated using `nx g @nrwl/angular:lib my-lib`.

## Workspace dependencies diagram

Run `nx graph` to see a diagram of the dependencies of your projects.
