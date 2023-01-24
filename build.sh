#!/bin/sh
npm run build && cp -r src/assets/ preview/ && cp src/styles.css preview/stc-widget.css && cp dist/stc-widget/output.js preview/stc-widget.js
