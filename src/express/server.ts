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
import * as express from 'express';
import * as session from 'express-session';
import * as exphbs from 'express-handlebars';
import * as bodyParser from 'body-parser';

// Local
import {
  ENV,
  STATIC_DIRECTORY_PATH,
  STATIC_URL,
  VIEWS_DIRECTORY_PATH,
} from './constants';
import { RootRouter } from './controllers/RootRouter';
import { BASE_WEBPACK_CONFIG } from '../../webpack/constants';
import {
  WEBPACK_COMPILATION_DIRECTORY_PATH,
  STATIC_COMPILATION_DIRECTORY_PATH,
} from '../../constants';
import {
  getRequestLogger,
  logServerStart,
} from './middlewares/logger';

/**
 * Cyclops express server
 * @type {Express}
 */
const app = express();

app.enable('strict routing');

// Static folder for webpack output.
app.use(
  BASE_WEBPACK_CONFIG.output.publicPath,
  express.static(WEBPACK_COMPILATION_DIRECTORY_PATH),
);
// Non compiled static content in express source directory.
app.use(STATIC_URL, express.static(STATIC_DIRECTORY_PATH));
// Compiled static assets in compilation directory.
app.use(STATIC_URL, express.static(STATIC_COMPILATION_DIRECTORY_PATH));

// Create a manifest if a google cloud messaging sender id is present.
// if (ENV.GCM_SENDER_ID) {
//   const path = createManifestPath(STATIC_COMPILATION_DIRECTORY_PATH);
//
//   createManifest(ENV.GCM_SENDER_ID, path);
//   app.use('/manifest.json', express.static(path));
// }

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express sessions
app.use(session({ secret: ENV.CYCLOPS_SESSION_SECRET }));

// View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', VIEWS_DIRECTORY_PATH);

// Request logging
app.use(getRequestLogger());

// Root router
app.use('/', new RootRouter().router);

// Server start
app.listen(ENV.CYCLOPS_PORT, () => {
  logServerStart();
});
