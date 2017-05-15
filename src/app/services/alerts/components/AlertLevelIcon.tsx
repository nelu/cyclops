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

/** Properties of the AlertLevelIcon component. */
interface Props {
  /** The alert level icon to show. */
  level: string;
}

/** Alert level values mapped to Fontawesome icon names. */
const LEVEL_ICONS: Dictionary<string> = {
  CRITICAL: 'fire',
  HIGH: 'exclamation-triangle',
  MEDIUM: 'exclamation-circle',
  LOW: 'exclamation',
  INFO: 'info',
};

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Shows the icon related to the an alert level.
 */
export class AlertLevelIcon extends React.Component<Props, {}> {
  public render() {
    const classes = classNames(
      `alert-text--${this.props.level.toLowerCase()}`,
      'alert-icon',
      'text-center',
      'fa',
      `fa-${LEVEL_ICONS[this.props.level]}`,
    );

    return <i className={classes} />;
  }
}
