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
import { resolve } from 'path';

// Local
import {
  ENV,
  STATIC_URL,
  VIEWS_DIRECTORY_PATH,
} from './constants';
import { RootRouter } from './controllers/RootRouter';
import * as webpackConfig from '../../webpack.config';
import {
  STATIC_COMPILATION_DIRECTORY_PATH,
  ROOT_DIRECTORY_PATH,
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
  webpackConfig.output.publicPath,
  express.static(webpackConfig.output.path),
);

// Compiled static assets in compilation directory. Includes webpack assets.
app.use(STATIC_URL, express.static(STATIC_COMPILATION_DIRECTORY_PATH));

app.use(
  STATIC_URL,
  express.static(resolve(ROOT_DIRECTORY_PATH, 'src/express/static')),
);

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express sessions
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: ENV.CYCLOPS_SESSION_SECRET,
}));

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
