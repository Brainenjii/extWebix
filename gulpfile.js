"use strict";
var gulp = require("gulp"),
  browserify = require("gulp-browserify");

// Basic usage
gulp.task("scripts", function scripts () {

  // Single entry point to browserify
  gulp.src("lib/index.js").pipe(
    browserify({
      insertGlobals: false
    })
  ).pipe(gulp.dest("./builds/"));

});
