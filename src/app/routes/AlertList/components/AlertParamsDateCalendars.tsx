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
import * as DateTime from 'react-datetime';
import * as moment from 'moment';

// Local
import { Close } from '../../../components/Close';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsDateCalendars component. */
interface Props {
  /** Date in string format to search after for alerts. */
  after?: string;
  /** Date in string format to search before for alerts. */
  before?: string;
  /** Closes the date select panel.  */
  close(): any;
  /**
   * Change the time frame to search for alerts.
   * @param time Time frame to search for alerts.
   */
  selectDate(time: { after?: string, before?: string }): any;
}

/** Internal state of the AlertParamsDateCalendars component. */
interface State {
  /** Date to search after for alerts. */
  after?: Date;
  /** Date to search before for alerts. */
  before?: Date;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a slide out panel that allows user to search alerts by date.
 */
export class AlertParamsDateCalendars extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const after = props.after ? new Date(props.after) : undefined;
    const before = props.before ? new Date(props.before) : undefined;

    this.state = { after, before };
  }

  /**
   * Changes the current before and after internal dates if the
   * current properties don't match.
   * @param props New properties the component will receive.
   */
  public componentWillReceiveProps(props: Props): void {
    const after = props.after ? new Date(props.after) : undefined;
    const before = props.before ? new Date(props.before) : undefined;

    if (this.state.after) {
      if (after){
        if (this.state.after.getTime() !== after.getTime()) {
          this.setState({ after });
        }
      } else {
        this.setState({ after: undefined });
      }
    } else {
      if (after) { this.setState({ after }); }
    }

    if (this.state.before) {
      if (before) {
        if (this.state.before.getTime() !== before.getTime()) {
          this.setState({ before });
        }
      } else {
        this.setState({ before: undefined });
      }
    } else {
      if (before) { this.setState({ before }); }
    }
  }

  /**
   * Changes the currently set after date.
   * @param value New date to set to.
   */
  public changeAfter = (value: moment.Moment): void => {
    // The DateTime will sometimes return a string instead of a moment object,
    // so whenever that happens just ignore it.
    try {
      this.setState({ after: value.toDate() });
      this.props.selectDate({
        after: value.format(),
        before: this.state.before ? moment(this.state.before).format() : undefined,
      });
    } catch (error) { return; }
  };

  /**
   * Changes the currently set before date.
   * @param value New date to set to.
   */
  public changeBefore = (value: moment.Moment): void => {
    // The DateTime will sometimes return a string instead of a moment object,
    // so whenever that happens just ignore it.
    try {
      this.setState({ before: value.toDate() });
      this.props.selectDate({
        after: this.state.after ? moment(this.state.after).format() : undefined,
        before: value.format(),
      });
    } catch (error) { return; }
  };

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className="alert-list-params__extender">
        <div className="alert-list-params__extender-close pull-right">
          <Close close={this.props.close} />
        </div>
        <h3 className="sub-title">After</h3>
        <DateTime
          value={this.state.after}
          onChange={this.changeAfter}
        />

        <h3 className="sub-title">Before</h3>
        <DateTime
          value={this.state.before}
          onChange={this.changeBefore}
        />
      </div>
    );
  }
}
