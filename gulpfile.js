var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var precss = require("precss");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var browserSync = require("browser-sync").create();

// STYLES
gulp.task("style", function() {
  var processors = [
    precss({}),
    autoprefixer({ browsers: ["last 2 versions"] })
  ];

  return gulp
    .src("resource/scss/style.scss")
    .pipe(postcss(processors))
    .pipe(cleanCSS({ level: 1 }))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("resource/css"))
    .pipe(browserSync.stream());
});

// BROWSER SYNC
gulp.task("serve", ["style"], function() {
  browserSync.init({
    server: "."
  });

  gulp.watch("resource/scss/style.scss", ["style"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
  // gulp.watch("resource/js/*.js").on('change', browserSync.reload);
});

// DEFAULT
gulp.task("default", ["serve"]);
