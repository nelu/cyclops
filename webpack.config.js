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

/**
 * If webpack was run in a production environment.
 * @type {boolean}
 */
const IS_PRODUCTION = process.env.NODE_ENV === 'PROD';

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
 * Webpack loader for typescript files.
 * @type {Object}
 */
const TYPESCRIPT_LOADER = {
  loader: 'awesome-typescript-loader',
  options: {
    configFileName: path.resolve(__dirname, 'src/react/tsconfig.json'),
  },
};

/**
 * Webpack rule for Typescript files.
 * @type {Object}
 */
const TYPESCRIPT_RULE = {
  test: /\.tsx?$/,
  include: path.resolve(__dirname, 'src/react'),
  use: [
    TYPESCRIPT_LOADER,
  ],
};

/**
 * Webpack loader for CSS files.
 * @type {Object}
 */
const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    minimize: IS_PRODUCTION,
    sourceMap: IS_PRODUCTION,
  },
};

/**
 * Webpack rule for sass files.
 * @type {Object}
 */
const SCSS_RULE = {
  test: /\.scss$/,
  include: path.resolve(__dirname, 'src/scss'),
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      CSS_LOADER,
      'sass-loader',
    ],
  }),
};

/** List of plugins to add contextual to the environment. */
const contextualPlugins = IS_PRODUCTION
  ? [new webpack.optimize.UglifyJsPlugin({ sourceMap: true })]
  : [];

/**
 * Webpack configuration.
 * @type {Object}
 */
module.exports = {
  context: __dirname,

  entry: './src/react/app.tsx',

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build/static'),
    publicPath: '/static/',
  },

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
    ],
    alias: {
      'mapbox-gl': path.resolve(
        __dirname,
        'node_modules/mapbox-gl/dist/mapbox-gl.js'
      ),
    },
  },

  devtool: IS_PRODUCTION ? 'source-map' : 'inline-source-map',

  module: {
    rules: [
      CSS_RULE,
      TYPESCRIPT_RULE,
      SCSS_RULE,
    ],
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  },

  plugins: [
    new ExtractTextPlugin('css/styles.css'),
  ].concat(contextualPlugins),
};
