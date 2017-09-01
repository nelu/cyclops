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

/** Properties of the FlexItem component. */
interface Props {
  className?: string;
  shrink?: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Item aligned inside of a FlexBox element.
 */
export class FlexItem extends React.Component<Props, {}> {
  public render() {
    const classes = classnames(this.props.className, 'flex-item', {
      'flex--shrink': this.props.shrink,
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}
