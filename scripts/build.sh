#!/bin/bash
browserify -r extwebix -o ./builds/extwebix.js
echo "window.EW = require('extwebix');" >> builds/extwebix.js

 