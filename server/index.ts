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
import { RootRouter } from './controllers/RootRouter';
import {
  CYCLOPS_SESSION_SECRET,
  CYCLOPS_PORT,
} from '../cyclops.config';
import {
  logServerStart,
  requestLogger,
} from './utils/logger';

/**
 * Cyclops express server.
 * @type {Express}
 */
const app = express();

app.enable('strict routing');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express sessions
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: CYCLOPS_SESSION_SECRET,
}));

// View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', resolve(__dirname, 'views'));

// Request logging
app.use(requestLogger);

// Root router
app.use('/', new RootRouter().router);

// Server start
app.listen(CYCLOPS_PORT, () => {
  logServerStart();
});
