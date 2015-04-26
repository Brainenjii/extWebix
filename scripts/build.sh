#!/bin/bash
ln -s ../lib node_modules/extwebix
browserify -r extwebix -o ./builds/extwebix.js
echo "window.EW = require('extwebix');" >> builds/extwebix.js

 