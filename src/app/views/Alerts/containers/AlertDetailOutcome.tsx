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
import { bindActionCreators } from 'redux';
import {
  connect,
  ComponentDecorator,
} from 'react-redux';

// Local
import {
  Alert,
  AlertDetail,
  AlertOutcomeChoices,
} from '../../../api/alerts/types';
import {
  Select,
  SelectOption,
} from '../../../components/Select';
import { TextAreaPlain } from '../../../components/TextAreaPlain';
import {
  DispatchToProps,
  StateToProps
} from '../../../types/redux';
import {
  changeNotes,
  changeOutcome,
  open,
  close,
  submit,
  removeOutcome,
} from './AlertDetailOutcomeActions';
import { AlertDetailOutcomeForm } from '../components/AlertDetailOutcomeForm';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Value properties of the AlertDetailOutcome component. */
interface ValueProps {
  /** If the form to change the outcome should be shown. */
  active: boolean;
  /** Current alert notes. */
  notes: string;
  /** Current alert outcome. */
  outcome: AlertOutcomeChoices;
}

/** Function properties of the AlertDetailOutcome component. */
interface FunctionProps {
  /**
   * Function that runs whenever the outcome is changed.
   * @param outcome Selected outcome.
   */
  changeOutcome(outcome: AlertOutcomeChoices): any;
  /**
   * Function that runs whenever the alert analysis changes.
   * @param notes Written notes.
   */
  changeNotes(notes: string): any;
  /**
   * Submits the changes to the alert outcome and notes.
   * @param alert Alert to change.
   * @param outcome Outcome to change to.
   * @param notes Notes to change to.
   */
  submit(alert: Alert, outcome: AlertOutcomeChoices, notes: string): any;
  removeOutcome(alert: Alert): any;
  open(outcome: AlertOutcomeChoices, notes: string): any;
  close(): any;
}

/** Passed in properties of the AlertDetailOutcome component. */
interface OwnProps {
  /** Alert to modify. */
  alert: AlertDetail;
}

/** All properties of the AlertDetailOutcome component. */
type Props = ValueProps & FunctionProps & OwnProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a subtle select that allows the user to change the outcome
 * of an alert.
 */
export class AlertDetailOutcome extends React.Component<Props, {}> {
  /**
   * Outcome options for the select drop down.
   * @type {SelectOption[]}
   */
  public static OUTCOME_OPTIONS: SelectOption[] = [{
    name: 'Completed',
    value: 'completed',
  }, {
    name: 'Duplicate',
    value: 'duplicate',
  }, {
    name: 'False Positive',
    value: 'false positive',
  }, {
    name: 'N/A',
    value: 'N/A',
  }];

  public submit = (): void => {
    this.props.submit(this.props.alert, this.props.outcome, this.props.notes);
  };

  /**
   * Selects the new outcome whenever it's changed in the SubtleSelect.
   * @param outcome Select onChange event.
   */
  public handleSelect = (outcome: string): void => {
    this.props.changeOutcome(outcome as AlertOutcomeChoices);
  };

  public open = (): void => {
    this.props.open(this.props.alert.outcome, this.props.alert.notes);
  };

  public render(): JSX.Element {
    const display = this.props.active
      ? (
        <AlertDetailOutcomeForm
          alert={this.props.alert}
          outcome={String(this.props.outcome)}
          notes={this.props.notes}
          changeOutcome={this.handleSelect}
          changeNotes={this.props.changeNotes}
          submit={this.submit}
          cancel={this.props.close}
        />
      ) : (
        <div>
          <button
            className="subtle-button alert-detail-outcome__button"
            onClick={this.open}
          >
            {this.props.alert.outcome || 'None'}
            {' '}
            <i className="caret" />
          </button>
          <div className="well alert-detail-outcome__well">
            {this.props.alert.notes || 'None'}
          </div>
        </div>
      );
    return (
      <div className="spacing-section">
        <h3 className="sub-title">Outcome</h3>
        {display}
      </div>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Maps the redux state to AlertDetailOutcome properties.
 * @param state Redux state.
 * @param props Properties passed to the container.
 */
const values: StateToProps<ValueProps, OwnProps> = (state, props) => ({
  active: state.alert.outcome.active,
  alert: props.alert,
  notes: state.alert.outcome.notes,
  outcome: state.alert.outcome.outcome,
});

/**
 * Maps redux dispatch functions to AlertDetailOutcome properties.
 * @param dispatch Dispatch function for the Redux store.
 */
const functions: DispatchToProps<FunctionProps, undefined> = (dispatch) => ({
  changeOutcome: bindActionCreators(changeOutcome, dispatch),
  changeNotes: bindActionCreators(changeNotes, dispatch),
  submit: bindActionCreators(submit, dispatch),
  open: bindActionCreators(open, dispatch),
  close: bindActionCreators(close, dispatch),
  removeOutcome: bindActionCreators(removeOutcome, dispatch),
});

/**
 * Redux container wrapper for the AlertDetailOutcome component.
 * @type {ComponentDecorator<ValueProps, FunctionProps, OwnProps>}
 */
export const AlertDetailOutcomeContainer = connect<
  ValueProps,
  FunctionProps,
  OwnProps
>(values, functions)(AlertDetailOutcome);
