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
const GLOBALS = require('../constants');

exports.BASE_WEBPACK_CONFIG = {
  entry: path.resolve(GLOBALS.REACT_SOURCE_DIRECTORY_PATH, `app.tsx`),
  output: {
    filename: `bundles/app.js`,
    path: GLOBALS.WEBPACK_COMPILATION_DIRECTORY_PATH,
    publicPath: '/static/',
  },
  resolve: {
    root: path.resolve(GLOBALS.ROOT_DIRECTORY_PATH),
    extensions: ['', '.jsx', '.js', '.ts', '.tsx'],
    alias: {
      'mapbox-gl': path.resolve(
        GLOBALS.NODE_MODULES_DIRECTORY_PATH, 'mapbox-gl/dist/mapbox-gl.js'
      ),
    },
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.tsx?$/,
      include: GLOBALS.REACT_SOURCE_DIRECTORY_PATH,
      loader: `awesome-typescript?configFileName=${GLOBALS.REACT_SOURCE_DIRECTORY_PATH}/tsconfig.json`,
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff&name=./fonts/[hash].[ext]',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=./fonts/[hash].[ext]',
    }],
  },
};
