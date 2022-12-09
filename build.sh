#!/bin/sh
npm run build
&& cp src/assets/ preview/
&& cp src/styles.css preview/
&& cp dist/angular-element-app/output.js preview/angularapp.js
