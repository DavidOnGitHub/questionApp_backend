'user strict';

var gulp = require('gulp'),
	tsc = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps'),
	nodemon = require('gulp-nodemon'),
    nodeInspector = require('gulp-node-inspector'),
    mocha = require('gulp-mocha'),
	exec = require('child_process').exec,
	clean = require('gulp-clean');

function runExternalCommand(command) {
	return function(callback) {
		exec(command, function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			callback(err);
		});
	};
}

gulp.task('clean', function() {
	console.log('cleaning');
	return gulp.src(['build/*'])
		.pipe(clean());
})

gulp.task('compile-ts', function() {
	var serverTsFiles = ['server/**/*.ts', 'typings/main.d.ts'];
    var serverTestTsFiles = ['test/server/**/*.ts', 'typings/main.d.ts'];

    // var mainTsProject = tsc.createProject('tsconfig.json');
	var serverTsProject = tsc.createProject('tsconfig.json');
    var serverTestTsProject = tsc.createProject('tsconfig.json');
    // var mainTsResult = gulp.src(mainTsFile)
	// 					.pipe(sourcemaps.init())
	// 					.pipe(tsc(mainTsProject));

	var serverTsResult = gulp.src(serverTsFiles)
						.pipe(sourcemaps.init())
						.pipe(tsc(serverTsProject));
                        
    var serverTestTsResult = gulp.src(serverTestTsFiles)
						.pipe(sourcemaps.init())
						.pipe(tsc(serverTestTsProject));

    // mainTsResult.dts.pipe(gulp.dest('build'));
	// mainTsResult.js.pipe(sourcemaps.write('.'))
	// 			.pipe(gulp.dest('build'));
                
	serverTsResult.dts.pipe(gulp.dest('build'));
	serverTsResult.js.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('build'));
                
    serverTestTsResult.dts.pipe(gulp.dest('test/server'));
	serverTestTsResult.js.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('test/server'));

});
gulp.task('copy', function() {
	console.log('copying');
	gulp.src('server/**/*.html')
		.pipe(gulp.dest('build'));
});
gulp.task('startdb', runExternalCommand('mongod --dbpath ./data'));
gulp.task('stopdb', runExternalCommand('mongo admin --eval "db.shutdownServer()"'));
gulp.task('test', ['compile-ts'], function() {
    gulp.src('test/**/*Spec.js')
        .pipe(mocha({reporter: 'nyan'}));
});
gulp.task('debug', ['compile-ts', 'watch'], function() {
	nodemon({
		script: 'build/server.js',
		nodeArgs: ['--debug']
	});
});
gulp.task('inspector', function() {
	gulp.src('server/**/*.ts')
	.pipe(nodeInspector());
});
// gulp.task('watch', function() {
//    gulp.watch('server/**/*.ts', ['compile-ts']);
//    gulp.watch('test/**/*.ts', ['compile-ts']);
// });
gulp.task('serve', ['compile-ts', 'copy'], function() {
	nodemon({
		script: 'build/server.js',
        ext: 'ts html',
		watch: 'server/**/*.ts',
		tasks: ['compile-ts', 'copy'],
		nodeArgs: ['--harmony_destructuring']
	});
});