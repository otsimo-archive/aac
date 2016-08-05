var config = require('./config.js');
var gulp = require('gulp');
var util = require('gulp-util');
var fs = require('fs');

gulp.task('version:prod', function () {
  var directory = config.paths.src.ver+"/otsimo.json";
  var file = JSON.parse(fs.readFileSync(directory));
  var version = file['version'];
  var newVersion = version.split(".")[0] + "." + version.split(".")[1] + "." + parseInt(parseInt(version.split(".")[2]) + 1);

  file['version'] = newVersion;
  var fileJSON = JSON.stringify(file, null, 4);
  console.log("The version updated to: " + newVersion);
  fs.writeFileSync(directory, fileJSON);

});
