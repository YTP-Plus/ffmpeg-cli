const cp = require('child_process');
const fs = require('fs');
const path = require("path")
const {
	__execpath
} = require('./system');
const console = require('./console');
const FFmpeg = {
	run: cmd => new Promise((resolve, reject) => {
		var ccwd = process.cwd()
        process.chdir(path.dirname(__execpath));
		cp.exec(`"${path.basename(__execpath)}" ${cmd}`, {
			encoding: 'utf8'
		}, (err, output) => {
			if (err && err.code) reject(err);
			else resolve(output);
		});
		process.chdir(ccwd);
	}),
	path: __execpath,
	runSync: cmd => {
		var ccwd = process.cwd()
        process.chdir(path.dirname(__execpath));
		cp.execSync(`${path.basename(__execpath)} ${cmd}`, {
			encoding: 'utf8'
		})
		process.chdir(ccwd);
	},
	forceDownload: () => {
		try {
			cp.execSync(`node ${__dirname}/download.js`, {
				cwd: process.cwd(),
				stdio: 'inherit'
			});
			return true;
		} catch (e) {
			return false;
		}
	}
};

if (!fs.existsSync(__execpath)) {
	console.log('FFmpeg not detected, attempting to download...');

	// Check for possible corruption
	try {
		if (!FFmpeg.forceDownload() || !fs.existsSync(__execpath)) throw null;
		FFmpeg.runSync('-version');
		console.log(`FFmpeg verified at ${__execpath}`);
	} catch (e) {
		console.error('Unable to download FFmpeg! Try reinstalling or install manually.');
	}
}

module.exports = FFmpeg;
