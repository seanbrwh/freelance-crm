var gulp = require("gulp");
var rename = require("gulp-rename");

gulp.task("cpdir", () => {
  return gulp.src(["src/Server/views/**/*"]).pipe(gulp.dest("dist/views"));
});

gulp.task("cppack", () => {
  return gulp.src(["package.json"]).pipe(gulp.dest("dist"));
});

gulp.task("rename-env", () => {
  return gulp
    .src([".env.example"])
    .pipe(rename(".env"))
    .pipe(gulp.dest("."));
});

gulp.task("default", gulp.parallel("cpdir", "cppack", "rename-env"));
