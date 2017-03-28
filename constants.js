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

// Absolute path of the root of this project.
exports.ROOT_DIRECTORY_PATH = path.resolve(__dirname);

// --------------------------------------------------------------------------
// Compilation
// --------------------------------------------------------------------------
//
// Project variables related to the compilation of source files.
//

/**
 * Name of the compilation directory in reference to the root of this project.
 * @type {string}
 */
exports.COMPILATION_DIRECTORY = 'build';

/**
 * Absolute path of the compilation directory.
 * @type {string}
 */
exports.COMPILATION_DIRECTORY_PATH = path.resolve(
  exports.ROOT_DIRECTORY_PATH, exports.COMPILATION_DIRECTORY
);

// Webpack
// -------

/**
 * Name of the webpack compilation directory in reference to the
 * compilation directory.
 * @type {string}
 */
exports.WEBPACK_COMPILATION_DIRECTORY = 'webpack';

/**
 * Absolute path of the webpack compilation directory.
 * @type {string}
 */
exports.WEBPACK_COMPILATION_DIRECTORY_PATH = path.resolve(
  exports.COMPILATION_DIRECTORY_PATH, exports.WEBPACK_COMPILATION_DIRECTORY
);

// Static Assets
// -------------

/**
 * Name of the static asset compilation directory in reference to the
 * compilation directory.
 * @type {string}
 */
exports.STATIC_COMPILATION_DIRECTORY = 'static';

/**
 * Absolute path of the static asset compilation directory.
 * @type {string}
 */
exports.STATIC_COMPILATION_DIRECTORY_PATH = path.resolve(
  exports.COMPILATION_DIRECTORY_PATH, exports.STATIC_COMPILATION_DIRECTORY
);

// CSS Static Assets
// -----------------

/**
 * Name of the CSS static asset compilation directory in reference to the
 * static compilation directory.
 * @type {string}
 */
exports.CSS_COMPILATION_DIRECTORY = 'css';

/**
 * File name of the main css file.
 * @type {string}
 */
exports.MAIN_CSS_FILE = 'main.css';

/**
 * Absolute path of the CSS static asset compilation directory.
 * @type {string}
 */
exports.CSS_COMPILATION_DIRECTORY_PATH = path.resolve(
  exports.COMPILATION_DIRECTORY_PATH, exports.CSS_COMPILATION_DIRECTORY
);

// --------------------------------------------------------------------------
// Source
// --------------------------------------------------------------------------
//
// Project variables related to source files.
//

/**
 * Name of the directory where source files are located in reference to the
 * root of this project.
 * @type {string}
 */
exports.SOURCE_DIRECTORY = 'src';

/**
 * Absolute path of the source file directory.
 * @type {string}
 */
exports.SOURCE_DIRECTORY_PATH = path.resolve(
  exports.ROOT_DIRECTORY_PATH, exports.SOURCE_DIRECTORY
);

// React
// -----

/**
 * Name of the react source file directory in reference to the source
 * file directory.
 * @type {string}
 */
exports.REACT_SOURCE_DIRECTORY = 'react';

/**
 * Absolute path of the react source file directory.
 */
exports.REACT_SOURCE_DIRECTORY_PATH = path.resolve(
  exports.SOURCE_DIRECTORY_PATH, exports.REACT_SOURCE_DIRECTORY
);

// Express
// -------

/**
 * Name of the express server source file directory in reference to the source
 * file directory.
 * @type {string}
 */
exports.EXPRESS_SOURCE_DIRECTORY = 'express';

/**
 * Absolute path of the express server source file directory.
 * @type {string}
 */
exports.EXPRESS_SOURCE_DIRECTORY_PATH = path.resolve(
  exports.SOURCE_DIRECTORY_PATH, exports.EXPRESS_SOURCE_DIRECTORY
);

// SCSS
// ----

/**
 * Name of the sass source file directory in reference to the source
 * file directory.
 * @type {string}
 */
exports.SCSS_SOURCE_DIRECTORY = 'scss';

/**
 * Absolute path of the sass source file directory.
 * @type {string}
 */
exports.SCSS_SOURCE_DIRECTORY_PATH = path.resolve(
  exports.SOURCE_DIRECTORY_PATH, exports.SCSS_SOURCE_DIRECTORY
);

// --------------------------------------------------------------------------
// Third Party Libraries
// --------------------------------------------------------------------------
//
// Project variables related to third party libraries.
//

/**
 * Name of the folder that contains node modules in refrence to the root
 * directory.
 * @type {string}
 */
exports.NODE_MODULES_DIRECTORY = 'node_modules';

/**
 * Absolute path of the node modules directory.
 * @type {string}
 */
exports.NODE_MODULES_DIRECTORY_PATH = path.resolve(
  exports.ROOT_DIRECTORY_PATH, exports.NODE_MODULES_DIRECTORY
);

// --------------------------------------------------------------------------
// Dotenv
// --------------------------------------------------------------------------
//
// Project variables related to the dotenv file, which helps to inject
// node environment variables into the project.
//

/**
 * Name of the dotenv file.
 * @type {string}
 */
exports.ENV_FILE = 'cyclops.env';

/**
 * File path of the dotenv file.
 * @type {string}
 */
exports.ENV_FILE_PATH = path.resolve(
  exports.ROOT_DIRECTORY_PATH, exports.ENV_FILE
);
