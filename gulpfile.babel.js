/* eslint-disable no-undef, no-console */
import bg from 'gulp-bg';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import os from 'os';
import path from 'path';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import yargs from 'yargs';

import mochaRunCreator from './test/mochaRunCreator';
import webpackBuild from './webpack/build';

const args = yargs
  .alias('p', 'production')
  .argv;

// To fix some eslint issues: gulp eslint --fix
const runEslint = () => {
  const isFixed = file => args.fix && file.eslint && file.eslint.fixed;
  return gulp.src([
    'gulpfile.babel.js',
    'src/**/*.js',
    'src/**/*.jsx',
    'webpack/*.js',
  ], {
    base: './',
  }).pipe(eslint({ fix: args.fix }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
};

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('clean', () => del('build/*'));

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => runEslint());

// Exit process with an error code (1) on lint error for CI build.
gulp.task('eslint-ci', () => runEslint().pipe(eslint.failAfterError()));

gulp.task('mocha', () => {
  mochaRunCreator('process')();
});

// Enable to run single test file
// ex. gulp mocha-file --file src/browser/components/__test__/Button.js
gulp.task('mocha-file', () => {
  mochaRunCreator('process')({ path: path.join(__dirname, args.file) });
});

// Continuous test running
gulp.task('mocha-watch', () => {
  gulp.watch(
    ['src/browser/**', 'src/common/**', 'src/server/**'],
    mochaRunCreator('log'),
  );
});

gulp.task('test', (done) => {
  runSequence('eslint-ci', 'mocha', 'build-webpack', done);
});

gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-hot', bg('node', './webpack/server'));
// Shell fixes Windows este/issues/522, bg is still needed for server-hot.
gulp.task('server-nodemon', shell.task(
  // Normalize makes path cross platform.
  path.normalize('node_modules/.bin/nodemon --ignore webpack-assets.json src/server'),
));

gulp.task('server', ['env'], (done) => {
  if (args.production) {
    runSequence('clean', 'build', 'server-node', done);
  } else {
    runSequence('server-hot', 'server-nodemon', done);
  }
});

// Default task to start development. Just type gulp.
gulp.task('default', ['server']);

// Prerender app to HTML files. Useful for static hostings like Firebase.
// Test (OSX): cd build && python -m SimpleHTTPServer 8000
gulp.task('to-html', (done) => {
  args.production = true;

  const urls = {
    '/': 'index.html',
    '/foo-bla-bar': '404.html',
  };

  const fetch = url => new Promise((resolve, reject) => {
    require('http').get({
      host: 'localhost',
      path: url,
      port: 8000,
    }, (res) => {
      // Explicitly treat incoming data as utf8 (avoids issues with multi-byte).
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (data) => {
        body += data;
      });
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });

  const moveAssets = () => {
    const assets = fs.readdirSync('build');
    fs.mkdirSync(path.join('build', 'assets'));
    assets.forEach((fileName) => {
      fs.renameSync(
        path.join('build', fileName),
        path.join('build', 'assets', fileName),
      );
    });
  };

  const toHtml = () => {
    const promises = Object.keys(urls)
      .map(url => fetch(url)
      .then((html) => {
        fs.writeFile(path.join('build', urls[url]), html);
      }));
    return Promise.all(promises);
  };

  runSequence('eslint-ci', 'mocha', 'clean', 'build', () => {
    const proc = require('child_process').spawn('node', ['./src/server']);
    proc.stderr.on('data', data => console.log(data.toString()));
    proc.stdout.on('data', async (data) => {
      data = data.toString();
      if (data.indexOf('Server started') === -1) return;
      try {
        moveAssets();
        await toHtml();
      } catch (error) {
        console.log(error);
      } finally {
        proc.kill();
        done();
        console.log('App has been rendered to /build directory.');
      }
    });
  });
});

// React Native

// Various fixes for react-native issues. Must be called after npm install.
gulp.task('fix-react-native', (done) => {
  runSequence('fix-native-babelrc-files', 'fix-native-fbjs', done);
});

// https://github.com/facebook/react-native/issues/4062#issuecomment-164598155
// Still broken in RN 0.20. Remove fbjs from package.json after fix.
gulp.task('fix-native-babelrc-files', () =>
  del([
    'node_modules/**/.babelrc',
    '!node_modules/react-native/**',
  ]),
);

// https://github.com/facebook/react-native/issues/5467#issuecomment-173989493
// Still broken in RN 0.20. Remove fbjs from package.json after fix.
gulp.task('fix-native-fbjs', () =>
  del([
    'node_modules/**/fbjs',
    '!node_modules/fbjs',
  ]),
);
