var exec = require('child_process').exec;

var langArr = ["en", "tr"];
langArr.forEach(function(lan) {
	exec('rm -rf app/symbols/aac-' + lan + '/', function(err, stdo, stde) {
		console.log("Old files removed!");
		console.log("Cloning..");
		exec('git clone git@bitbucket.org:otsimo/aac-' + lan + '.git', { cwd: "app/symbols" }, function(err, stdo, stde) {
			console.log(stdo);
			console.log(lan + " Loaded!!");
		});
	});
});
