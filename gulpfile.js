var gulp = require("gulp");

gulp.task("cpdir", () => {
  return gulp.src(["src/Server/views/**/*"]).pipe(gulp.dest("dist/views"));
});

gulp.task("cppack", () => {
  return gulp.src(["package.json"]).pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.parallel("cpdir", "cppack"));
