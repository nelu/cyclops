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

interface User {
  id: number;
  company: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

/** Express namespace with custom session variables. */
declare namespace Express {
  /** Current user session. */
  export interface Session {
    /** Authentication token used to communicate with the Cyphon API. */
    token?: string;
    /** ID used to get chrome push notifications. */
    pushNotificationId?: string;
    /** User object associated with the authentication token. */
    user?: User;
    /** If this session is currently authenticated. */
    authenticated: boolean;
  }
}
