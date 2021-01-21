const path = require('path');
const console = require('./console');
const rootDir = path.join(__dirname, '..', 'ffmpeg');
const OS = process.platform;
const BIT = process.arch;
if (!(BIT === 'ia32' || BIT === 'x64')) console.error('CPU architecture not supported');
const allOS = {
	win32: {
		x64: {
			url: 'https://ytp-plus.github.io/FFmpeg-x86_64-MPlayer-With-Frei0r-WinXP.zip',
			path: '/../ffmpeg.exe'
		},
		ia32: {
			url: 'https://ytp-plus.github.io/FFmpeg-x86-MPlayer-With-Frei0r-WinXP.zip',
			path: '/../ffmpeg.exe'
		}
	}
};
if (!allOS[OS]) console.error('OS not supported!');
if (!allOS[OS][BIT]) console.error('Invalid OS and CPU architecture!');

const dir = path.join(rootDir, OS + BIT);
const execPath = path.join(dir, allOS[OS][BIT].path);

Object.assign(module.exports, {
	__rootdir: rootDir,
	__sourceurl: allOS[OS][BIT].url,
	__dir: dir,
	__zippath: path.join(rootDir, path.basename(allOS[OS][BIT].url)),
	__execpath: execPath,
	__execdir: path.dirname(execPath)
});
