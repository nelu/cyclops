/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Current running environment.
 * @type {string}
 */
const ENV = process.env.NODE_ENV || 'development';

/**
 * If webpack is being run in a production environment.
 * @type {boolean}
 */
const PRODUCTION = ENV === 'production';

/**
 * If webpack is being run in a test environment.
 * @type {boolean}
 */
const TESTING = ENV === 'test';

/**
 * If webpack is being run in a development environment.
 * @type {boolean}
 */
const DEVELOPMENT = ENV === 'development';

// --------------------------------------------------------------------------
// Loaders
// --------------------------------------------------------------------------

/**
 * Webpack loader for typescript files.
 * @type {Object}
 */
const TYPESCRIPT_LOADER = {
  loader: 'awesome-typescript-loader',
  options: {
    configFileName: path.resolve(__dirname, 'src/tsconfig.json'),
  },
};

/**
 * Webpack loader for CSS files.
 * @type {Object}
 */
const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    minimize: PRODUCTION,
    sourceMap: PRODUCTION,
  },
};

// --------------------------------------------------------------------------
// Rules
// --------------------------------------------------------------------------

const JS_SOURCEMAP_RULE = {
  test: /\.js$/,
  enforce: 'pre',
  use: ['source-map-loader'],
};

const TS_SOURCEMAP_RULE = {
  test: /\.tsx?$/,
  enforce: 'pre',
  use: ['source-map-loader'],
};

/**
 * Webpack rule for CSS files.
 * @type {Object}
 */
const CSS_RULE = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ],
};

/**
 * Webpack rule for Typescript files.
 * @type {Object}
 */
const TYPESCRIPT_RULE = {
  test: /\.tsx?$/,
  include: path.resolve(__dirname, 'src'),
  use: [
    TYPESCRIPT_LOADER,
  ],
};

/**
 * Webpack rule for sass files.
 * @type {Object}
 */
const SCSS_RULE = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src/styles'),
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      CSS_LOADER,
      'sass-loader',
    ],
  }),
};

/**
 * Webpack rule for generating code coverage.
 * @type {Object}
 */
const COVERAGE_RULE = {
  test: /\.tsx?$/,
  enforce: 'post',
  include: path.resolve(__dirname, 'src/app'),
  exclude: /\.spec\.tsx?$/,
  use: ['istanbul-instrumenter-loader'],
};

/**
 * Rules that are used no matter the environment
 * @type {Rule[]}
 */
const BASE_RULES = [
  JS_SOURCEMAP_RULE,
  TS_SOURCEMAP_RULE,
  CSS_RULE,
  TYPESCRIPT_RULE,
  SCSS_RULE,
];

/**
 * Rules that are used in a test environment.
 * @type {Rule[]}
 */
const TEST_RULES = [
  COVERAGE_RULE,
];

/**
 * Rules used in the webpack configuration.
 * @type {Rule[]}
 */
const RULES = TESTING ? BASE_RULES.concat(TEST_RULES) : BASE_RULES;

// --------------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------------

/**
 * Plugins that are used no matter the environment.
 * @type {Plugin[]}
 */
const BASE_PLUGINS = [
  new ExtractTextPlugin('cyclops.css'),
];

/**
 * Plugins that are used in a testing environment.
 * @type {Plugin[]}
 */
const TEST_PLUGINS = [
  new webpack.SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(tsx?|js)($|\?)/i, // process .js and .ts files only
  }),
];

/**
 * Plugins to add in a production environment.
 * @type {Plugin[]}
 */
const PRODUCTION_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
];

/**
 * Plugins specific to each environment.
 */
const PLUGIN_ASSIGNMENTS = {
  development: () => BASE_PLUGINS,
  production: () => BASE_PLUGINS.concat(PRODUCTION_PLUGINS),
  test: () => BASE_PLUGINS.concat(TEST_PLUGINS),
};

/**
 * Plugins used in the webpack configuration.
 * @type {Plugin[]}
 */
const PLUGINS = PLUGIN_ASSIGNMENTS[ENV]();

// --------------------------------------------------------------------------
// Configuration
// --------------------------------------------------------------------------

/**
 * Webpack configuration.
 * @type {Object}
 */
module.exports = {
  context: __dirname,

  entry: './src/main.ts',

  output: TESTING ? undefined : {
    filename: 'cyclops.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
    ],
    alias: {
      '~': path.resolve(__dirname, 'src/app/'),
    },
  },

  devtool: TESTING || DEVELOPMENT ? 'inline-source-map' : 'source-map',

  module: {
    rules: RULES,
    noParse: /(mapbox-gl)\.js$/,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
    mapboxgl: 'mapboxgl',
  },

  plugins: PLUGINS,
};
