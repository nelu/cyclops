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
import * as React from 'react';
import * as classNames from 'classnames';

// Local
import { Dictionary } from '~/types/object';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertStatusIcon component. */
interface Props {
  /** Status icon to show. */
  status: string;
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

/**
 * Status values mapped to Fontawesome icon names.
 * @type {Dictionary<string>}
 */
const STATUS_ICONS: Dictionary<string> = {
  NEW: 'circle-o',
  BUSY: 'circle',
  DONE: 'check-circle',
};

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the icon associated with the given alert status.
 */
export class AlertStatusIcon extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const classes = classNames(
      'text--emphasis',
      'text-center',
      'alert-icon',
      'fa',
      `fa-${STATUS_ICONS[this.props.status]}`,
    );

    return <i className={classes}/>;
  }
}
