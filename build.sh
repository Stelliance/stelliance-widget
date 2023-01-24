#!/bin/sh
npm run build && cp src/styles.css preview/ && cp dist/stc-widget/output.js preview/stc-widget.js
