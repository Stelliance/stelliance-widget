# Stelliance widget

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

[how to use it](https://stackblitz.com/edit/js-qmj8r3?file=index.html,index.js)

Run `npm install stc-widget` to install the library and declare component in template:

- Import the widget in your html file

```html
<head>
  <script src="node_modules/stc-widget/stc-widget.js"></script>
  <link href="node_modules/stc-widget/stc-widget.css" rel="stylesheet" />
</head>
```

- Call the web component

```html
<stc-app-widget environment="prod" app-logo-width="auto" app-logo-height="60"></stc-app-widget>
```

Inputs:

- `appLogoWidth` : define max width in px allowed for each logo image in template. Default value = `'auto'`

- `appLogoHeight` : define max height in px allowed for each logo image in template. Default value = `'60'`

- `environment`: `'dev'` | `'prod'` (default value: `dev`) to target a specific sso url for each web application.

- `position`: `'left'` | `'right'` (default value: `left`) to set the horizontal position of the dropdown menu.

## Demo

[Stelliance Widget](https://stelliance.github.io/stelliance-widget/)
