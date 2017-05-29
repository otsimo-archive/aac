var exec = require('child_process').exec;

const symbolPath = "app/symbols";
// relative to /tasks dir

const gitServer = "https://btk@gitlab.com/otsimo/aac-";
// git host, which will need authentication.

var langArr = ["en", "tr"];
langArr.forEach(function(lan) {
	exec('rm -rf aac-' +symbolPath+ '/' + lan + '/', function(err, stdo, stde) {
		console.log("Old files removed!");
		console.log("Start Cloning..");
		exec('git clone ' + gitServer + lan + '.git', { cwd: symbolPath }, function(err, stdo, stde) {
			console.log(stdo);
			console.log(lan + " Loaded!!");
		});
	});
});
