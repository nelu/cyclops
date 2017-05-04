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

// Local
import { SubtleSelect } from '../../../components/SubtleSelect';
import { OUTCOME_OPTIONS, OUTCOME_OPTIONS_LIST } from '../constants';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOutcomeSelect component. */
interface Props {
  /** Current alert outcome. */
  currentOutcome: string | null;
  /**
   * Changes the outcome of the alert.
   * @param outcome Outcome to change to.
   */
  selectOutcome(outcome: string | null): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a subtle select that allows the user to change the outcome
 * of an alert.
 */
export class AlertDetailOutcomeSelect extends React.Component<Props, {}> {
  /**
   * Selects the new outcome whenever it's changed in the SubtleSelect.
   * @param outcome New outcome.
   */
  public handleSelect = (outcome: string) => {
    if (outcome === 'null') { this.props.selectOutcome(null); }
    else { this.props.selectOutcome(outcome); }
  };

  public render(): JSX.Element {
    const currentOutcomeString = String(this.props.currentOutcome);
    const currentlySelected = OUTCOME_OPTIONS[currentOutcomeString].name;

    return (
      <SubtleSelect
        options={OUTCOME_OPTIONS_LIST}
        currentValue={currentOutcomeString}
        onSelect={this.handleSelect}
      >
        {currentlySelected}
      </SubtleSelect>
    );
  }
}
