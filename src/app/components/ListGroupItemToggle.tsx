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
import { ListGroupItem } from 'react-bootstrap';
import {
  includesOrEquals,
  toggleValue
} from '~/utils/arrayUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the ListGroupItemToggle component. */
interface Props {
  value: any;
  currentValue: any;
  onClick(value: any): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 *
 */
export class ListGroupItemToggle extends React.Component<Props, {}> {
  /** Toggles the passed in value onto the current value. */
  public toggle = () => {
    this.props.onClick(toggleValue(this.props.currentValue, this.props.value));
  };

  public render() {
    return (
      <ListGroupItem
        active={includesOrEquals(this.props.currentValue, this.props.value)}
        onClick={this.toggle}
      >
        {this.props.children}
      </ListGroupItem>
    );
  }
}
