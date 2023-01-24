# Stelliance widgdet

![Last build](https://github.com/Stelliance/stelliance-widget/actions/workflows/build.yml/badge.svg)

## Purpose of this library

Added in your frontend, this widget will allow your users to navigate to other stelliance's companies web applications using SSO with no re-authentication needed.

## Technical stack

- Angular 13
- TypeScript
- Semantic Release
- Unit Test with Karma

## How to build the library

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
An `output.js` file will be created in `dist` folder and can be used in any html page (no extra files are needed)

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Serve locally the generic web component

If you need to see the render of the web component locally you can run `npm run preview:serve`.

## How to use it in any frontend

Run `npm install <LIB-NAME>` to install the library and declare component in template:

```
<stc-app-widget></stc-app-widget>
```

Inputs:

- `appLogoWidth` : define max width in px allowed for each logo image in template. Default value = `'auto'`

- `appLogoHeight` : define max height in px allowed for each logo image in template. Default value = `'60'`

- `environment`: `'dev'` | `'prod'` (default value) to target a specific sso url for each web application.

## Demo

[Stelliance Widget](https://stelliance.github.io/stelliance-widget/)
