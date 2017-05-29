/*
  a nodejs script to update the otsimo game
  manifest version.
*/

var fs = require('fs');

var directory = "app/otsimo.json";
var file = JSON.parse(fs.readFileSync(directory));
var version = file['version'];
var newVersion = version.split(".")[0] + "." + version.split(".")[1] + "." + parseInt(parseInt(version.split(".")[2]) + 1);

file['version'] = newVersion;
var fileJSON = JSON.stringify(file, null, 4);
console.log("The version updated to: " + newVersion);
fs.writeFileSync(directory, fileJSON);
