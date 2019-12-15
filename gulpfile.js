var gulp = require("gulp");
var exec = require("gulp-exec");

gulp.task("directories", done => {
  return gulp
    .src("./**/**")
    .pipe(
      exec(
        "cp -n ./src/Server/views ./dist -r",
        done(console.log("Directory copied"))
      )
    )
    .end();
});
