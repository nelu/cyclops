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

/**
 * Constants used across multiple parts of the Cyclops project.
 */
declare interface ProjectConstants {
  /**
   * Absolute path of the root of this project.
   */
  ROOT_DIRECTORY_PATH: string;

  /**
   * Name of the compilation directory in reference to the root of
   * this project.
   */
  COMPILATION_DIRECTORY: string;

  /**
   * Absolute path of the compilation directory.
   */
  COMPILATION_DIRECTORY_PATH: string;

  /**
   * Name of the webpack compilation directory in reference to the
   * compilation directory.
   */
  WEBPACK_COMPILATION_DIRECTORY: string;

  /**
   * Absolute path of the webpack compilation directory.
   */
  WEBPACK_COMPILATION_DIRECTORY_PATH: string;

  /**
   * Name of the static asset compilation directory in reference to the
   * compilation directory.
   */
  STATIC_COMPILATION_DIRECTORY: string;

  /**
   * Absolute path of the static asset compilation directory.
   */
  STATIC_COMPILATION_DIRECTORY_PATH: string;

  /**
   * Name of the CSS static asset compilation directory in reference to the
   * static compilation directory.
   */
  CSS_COMPILATION_DIRECTORY: string;

  /**
   * File name of the main css file.
   */
  MAIN_CSS_FILE: string;

  /**
   * Absolute path of the CSS static asset compilation directory.
   */
  CSS_COMPILATION_DIRECTORY_PATH: string;

  /**
   * Name of the directory where source files are located in reference to the
   * root of this project.
   */
  SOURCE_DIRECTORY: string;

  /**
   * Absolute path of the source file directory.
   */
  SOURCE_DIRECTORY_PATH: string;

  /**
   * Name of the react source file directory in reference to the source
   * file directory.
   */
  REACT_SOURCE_DIRECTORY: string;

  /**
   * Absolute path of the react source file directory.
   */
  REACT_SOURCE_DIRECTORY_PATH: string;

  /**
   * Name of the express server source file directory in reference to the source
   * file directory.
   */
  EXPRESS_SOURCE_DIRECTORY: string;

  /**
   * Absolute path of the express server source file directory.
   */
  EXPRESS_SOURCE_DIRECTORY_PATH: string;

  /**
   * Name of the sass source file directory in reference to the source
   * file directory.
   */
  SCSS_SOURCE_DIRECTORY: string;

  /**
   * Absolute path of the sass source file directory.
   */
  SCSS_SOURCE_DIRECTORY_PATH: string;

  /**
   * Name of the folder that contains node modules in reference to the root
   * directory.
   */
  NODE_MODULES_DIRECTORY: string;

  /**
   * Absolute path of the node modules directory.
   */
  NODE_MODULES_DIRECTORY_PATH: string;

  /**
   * Name of the dotenv file.
   */
  ENV_FILE: string;

  /**
   * File path of the dotenv file.
   */
  ENV_FILE_PATH: string;
}

declare let projectConstants: ProjectConstants;

export = projectConstants;
