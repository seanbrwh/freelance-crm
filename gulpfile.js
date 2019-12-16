var gulp = require("gulp");

gulp.task("directories", done => {
  return gulp.src(["src/Server/views/**/*"]).pipe(gulp.dest("dist/views"));
});
