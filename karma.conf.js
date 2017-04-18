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

const webpack = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    files: [
      'src/react/**/*.spec.ts',
      'src/react/**/*.spec.tsx',
    ],

    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],

    logLevel: config.LOG_WARN,

    preprocessors: {
      'src/react/**/*.spec.ts': ['webpack'],
      'src/react/**/*.spec.tsx': ['webpack'],
    },

    reporters: ['dots'],

    browsers: ['PhantomJS'],

    webpack: Object.assign({}, webpack, {
      devtool: 'inline-source-map',
    }),
  });
};
