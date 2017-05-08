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
import { AlertOutcomeChoices } from '../../../api/alerts/types';
import { OUTCOME_OPTIONS } from '../constants';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeDisplay component. */
interface Props {
  /** Current alert notes. */
  notes: string;
  /** Current alert outcome. */
  outcome: AlertOutcomeChoices;
  /** Opens the alert outcome form. */
  open(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays information about an alert detail outcome and it's analysis.
 */
export class AlertDetailOutcomeDisplay extends React.Component<Props, {}> {
  public render() {
    const outcome = this.props.outcome
      ? OUTCOME_OPTIONS[this.props.outcome].name
      : <i>Click here to select outcome</i>;

    return (
      <div>
        <button
          className="subtle-button alert-detail-outcome__button"
          onClick={this.props.open}
        >
          {outcome}
          {' '}
          <i className="caret" />
        </button>
        <div className="well alert-detail-outcome__well">
          {this.props.notes || 'None'}
        </div>
      </div>
    );
  }
}
