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
import { OverlayTrigger, Popover } from 'react-bootstrap';
import * as classnames from 'classnames';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the PollingToggleButton component. */
interface Props {
  isActive: boolean;
  text: string;
  onClick?(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Spinning refresh button with popover text.
 */
export class RefreshSpinner extends React.Component<Props, {}> {
  public render() {
    const popover = <Popover>{this.props.text}</Popover>;
    const buttonClasses = classnames('alert-list__refresh', {
      'alert-list__refresh--active': this.props.isActive,
    });
    const iconClasses = classnames('fa', 'fa-refresh', 'fa-lg', {
      'fa-spin': this.props.isActive,
    });

    return (
      <OverlayTrigger
        overlay={popover}
        placement="left"
        animation={false}
      >
        <button
          className={buttonClasses}
          onClick={this.props.onClick}
        >
          <i className={iconClasses} />
        </button>
      </OverlayTrigger>
    );
  }
}
