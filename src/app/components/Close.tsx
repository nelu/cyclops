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
import {
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

// Local
import { createRandomId } from '../utils/stringUtils';

interface Props {
  /** Function that runs when the close button is clicked. */
  close(): any;
}

/**
 * Displays a close button with a tooltip explaining that it's a close button.
 */
export class Close extends React.Component<Props, {}> {
  /**
   * Popover element that lets the user know that this button closes
   * something.
   * @type {JSX.Element}
   */
  public ClosePopover: JSX.Element;

  constructor(props: Props) {
    super(props);

    this.ClosePopover = <Popover id={createRandomId()}>Close</Popover>;
  }

  public render(): JSX.Element {
    return (
      <OverlayTrigger
        overlay={this.ClosePopover}
        placement="bottom"
        animation={false}
      >
        <button onClick={this.props.close} className="btn-alt">
          <i className="fa fa-times" />
        </button>
      </OverlayTrigger>
    );
  }
}
