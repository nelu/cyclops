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
import { AlertOutcomeChoices } from '../../../api/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeRemove component. */
interface Props {
  outcome: AlertOutcomeChoices;
  remove(): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a button that removes the current outcome for an alert.
 */
export class AlertDetailOutcomeRemove extends React.Component<Props, {}> {
  /**
   * Popover explaining that this button removes the current alert outcome.
   * @type {JSX.Element}
   */
  public static POPOVER = (
    <Popover id="alert-detail-outcome-remove-popover">
      Remove Outcome
    </Popover>
  );

  public render() {
    if (this.props.outcome === null) { return null; }

    return (
      <OverlayTrigger
        overlay={AlertDetailOutcomeRemove.POPOVER}
        placement="top"
        animation={false}
      >
        <button
          className="alert-detail__assign-btn"
          onClick={this.props.remove}
        >
          <i className="fa fa-minus" />
        </button>
      </OverlayTrigger>
    );
  }
}