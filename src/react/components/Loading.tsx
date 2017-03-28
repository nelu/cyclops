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
import * as classnames from 'classnames';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the Loading component. */
interface Props {
  /** If the icon should take up the whole screen. */
  global?: boolean;
  /** If the icon should not include a muted backdrop. */
  baseBg?: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a loading spinner.
 */
export class Loading extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const optionalClasses = {
      loading_base: this.props.baseBg,
      loading_global: this.props.global,
    };
    const classes = classnames('loading', optionalClasses);

    return (
      <div className={classes}>
        <div className="loading__spinner">
          <div className="loading__dot1"/>
          <div className="loading__dot2"/>
        </div>
      </div>
    );
  }
}
