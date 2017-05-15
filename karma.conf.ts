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
import { Config } from 'karma';

// Local
import webpackConfig from './webpack.config';

export default (config: Config) => {
  config.set(<any> {
    files: [
      'src/test.ts',
    ],

    frameworks: [
      'mocha',
      'chai',
      'sinon',
    ],

    plugins: [
      'karma-webpack',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-remap-istanbul',
    ],

    logLevel: config.LOG_WARN,

    preprocessors: {
      './src/test.ts': ['webpack', 'sourcemap'],
    },

    reporters: ['dots', 'coverage', 'karma-remap-istanbul'],

    browsers: ['PhantomJS'],

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only',
    },

    client: {
      captureConsole: true,
    },

    coverageReporter: {
      dir: 'coverage',

      reporters: [
        { type: 'text-summary' },
        { type: 'json', subdir: '.', file: 'coverage.json' },
      ],
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage.json',
      reports: {
        html: 'coverage/html',
        lcovonly: 'coverage/lcov.info',
      },
      timeoutNotCreated: 2000,
      timeoutNoMoreFiles: 2000,
    },
  });
};
