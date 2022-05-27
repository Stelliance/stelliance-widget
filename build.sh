#!/bin/sh
ng build angular-element-app --prod --output-hashing=none \
&& cat dist/angular-element-app/runtime.js dist/angular-element-app/polyfills.js \
dist/angular-element-app/main.js > preview/angularapp.js
