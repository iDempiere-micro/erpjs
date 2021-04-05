const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');
const fs = require('fs');

/**
 * Extend the default Webpack configuration from nest.
 */
module.exports = (config) => {
  const outputPath = './apps/api/'; // config.output.filename;

  // Extract output path from context

  // Install additional plugins
  config.plugins = config.plugins || [];
  try {
    config.plugins.push(...extractRelevantNodeModules(outputPath));
  } catch (e) {
    console.error('FAILED', e);
  }

  return config;
};

/**
 * This repository only contains one single package.json file that lists the dependencies
 * of all its frontend and backend applications. When a frontend application is built,
 * its external dependencies (aka Node modules) are bundled in the resulting artifact.
 * However, it is not the case for a backend application (for various valid reasons).
 * Installing all the production dependencies would dramatically increase the size of the
 * artifact. Instead, we need to extract the dependencies which are actually used by the
 * backend application. We have implemented this behavior by complementing the default
 * Webpack configuration with additional plugins.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {Array} An array of Webpack plugins
 */
function extractRelevantNodeModules(outputPath) {
  copyYarnLockFile(outputPath);
  return [generatePackageJson()];
}

/**
 * Copy the Yarn lock file to the bundle to make sure that the right dependencies are
 * installed when running `yarn install`.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {*} A Webpack plugin
 */
function copyYarnLockFile(outputPath) {
  const dir = process.cwd() + '/dist';
  function ensureDir(dir){ if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }}
  ensureDir(process.cwd() + '/dist');
  fs.copyFileSync('./yarn.lock', dir + '/yarn.lock' );
}

/**
 * Generate a package.json file that contains only the dependencies which are actually
 * used in the code.
 *
 * @returns {*} A Webpack plugin
 */
function generatePackageJson() {
  const implicitDeps = [
    'class-transformer',
    'class-validator',
    '@nestjs/platform-express',
    'reflect-metadata',
    'passport',
    'apollo-server-core',
    'pg',
    'apollo-server-express',
    'rxjs',
  ];
  const dependencies = implicitDeps.reduce((acc, dep) => {
    acc[dep] = packageJson.dependencies[dep];
    return acc;
  }, {});
  const basePackageJson = {
    name: 'erpjs',
    version: '0.0.0',
    license: 'PRIVATE',
    engines: {
      node: '12.x'
    },
    scripts: {
      start: 'node apps/api/main.js'
    },
    dependencies
  };
  return new GeneratePackageJsonPlugin(basePackageJson);
}
