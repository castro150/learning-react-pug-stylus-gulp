const gulp = require("gulp");
const pug = require("gulp-pug");
const styl = require("gulp-stylus");
const path = require("path");

var dest = path.resolve(__dirname, "src");

gulp.task("styl", function () {
    return gulp.src("./src/stylus/main.styl")
        .pipe(styl())
        .pipe(gulp.dest(dest + "/css"));
});

gulp.task("pug", function () {
    return gulp.src("./src/index.pug")
        .pipe(pug())
        .pipe(gulp.dest(dest));
});

gulp.task("build", [
    "styl",
    "pug"
]);