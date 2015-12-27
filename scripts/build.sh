#!/bin/bash
browserify -x async -x lodash -r extwebix -o ./builds/extwebix.js
echo "window.EW = require('extwebix');" >> builds/extwebix.js

 