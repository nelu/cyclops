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
import * as moment from 'moment';
import { Dictionary } from '../../../types/object';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDateSelect component. */
interface Props {
  /** Date in string format to search for alerts after. */
  after?: string;
  /** Date in string format to search for alerts before. */
  before?: string;
  /**
   * Changes the selected times to search for alerts.
   * @param time Time range to search in.
   */
  changeTime(time: TimeObject): any;
}

/** Selectable time range. */
interface TimeOption {
  /** Display name of the range. */
  name: string;
  /** Function that returns the time to search for alerts before. */
  before(): moment.Moment | undefined;
  /** Function that returns the time to search for alerts after. */
  after(): moment.Moment | undefined;
}

/** Object that represents a time range for search for alerts in. */
interface TimeObject {
  /** Date in string format to search for alerts before. */
  before?: string;
  /** Date in string format to search for alerts after. */
  after?: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Shows a list of predefined selectable dates.
 */
export class AlertDateSelect extends React.Component<Props, {}> {
  /**
   * Time range that represents the past hour.
   * @type {TimeOption}
   */
  public static PAST_HOUR: TimeOption = {
    after: () => moment().subtract(1, 'hours'),
    before: () => undefined,
    name: 'Past Hour',
  };

  /**
   * Time range the represents today.
   * @type {TimeOption}
   */
  public static TODAY: TimeOption = {
    after: () => moment().startOf('day'),
    before: () => undefined,
    name: 'Today',
  };

  /**
   * Time range that represents this week.
   * @type {TimeOption}
   */
  public static THIS_WEEK: TimeOption = {
    after: () => moment().startOf('week'),
    before: () => moment().endOf('week'),
    name: 'This Week',
  };

  /**
   * Time range that represents last week.
   * @type {TimeOption}
   */
  public static LAST_WEEK: TimeOption = {
    after: () => moment().subtract(1, 'weeks').startOf('week'),
    before: () => moment().subtract(1, 'weeks').endOf('week'),
    name: 'Last Week',
  };

  /**
   * Time range that represents this month.
   * @type {TimeOption}
   */
  public static THIS_MONTH: TimeOption = {
    after: () => moment().startOf('month'),
    before: () => moment().endOf('month'),
    name: 'This Month',
  };

  /**
   * Time range that represents last month.
   * @type {TimeOption}
   */
  public static LAST_MONTH: TimeOption = {
    after: () => moment().subtract(1, 'months').startOf('month'),
    before: () => moment().subtract(1, 'months').endOf('month'),
    name: 'Last Month',
  };

  /**
   * All time options in a sorted array.
   * @type {TimeOption[]}
   */
  public static OPTIONS: TimeOption[] = [
    AlertDateSelect.PAST_HOUR,
    AlertDateSelect.TODAY,
    AlertDateSelect.THIS_WEEK,
    AlertDateSelect.LAST_WEEK,
    AlertDateSelect.THIS_MONTH,
    AlertDateSelect.LAST_MONTH,
  ];

  /**
   * All time options indexed by their name.
   * @type {Dictionary<TimeOption>}
   */
  public static INDEXED_OPTIONS: Dictionary<TimeOption> = {
    [AlertDateSelect.PAST_HOUR.name]: AlertDateSelect.PAST_HOUR,
    [AlertDateSelect.TODAY.name]: AlertDateSelect.TODAY,
    [AlertDateSelect.THIS_WEEK.name]: AlertDateSelect.THIS_WEEK,
    [AlertDateSelect.LAST_WEEK.name]: AlertDateSelect.LAST_WEEK,
    [AlertDateSelect.THIS_MONTH.name]: AlertDateSelect.THIS_MONTH,
    [AlertDateSelect.LAST_MONTH.name]: AlertDateSelect.LAST_MONTH,
  };

  /**
   * Determines if any of the time options match the currently selected
   * time range.
   * @param time Time range to compare with the time options.
   * @returns {string} Name of the time option it matches.
   */
  public static determineValue(time: TimeObject): string {
    let value = '';

    AlertDateSelect.OPTIONS.some((option) => {
      const optionAfter = option.after();
      const optionBefore = option.before();
      const formattedAfter = optionAfter ? optionAfter.format() : undefined;
      const formattedBefore = optionBefore ? optionBefore.format() : undefined;

      if (time.after === formattedAfter && time.before === formattedBefore) {
        value = option.name;
        return true;
      } else  {
        return false;
      }
    });

    return value;
  }

  /**
   * Handles the change event emitted from the select element containing
   * the time options by changing the current time range to search for
   * alerts.
   * @param event Change event emitted from the select element.
   */
  public handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    const selected = event.currentTarget.value;
    const indexedOption = AlertDateSelect.INDEXED_OPTIONS[selected];

    if (indexedOption) {
      const after = indexedOption.after();
      const before = indexedOption.before();
      const timeObject = {
        after: after ? after.format() : undefined,
        before: before ? before.format() : undefined,
      };
      this.props.changeTime(timeObject);
    } else {
      this.props.changeTime({ after: undefined, before: undefined });
    }
  };

  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const options = AlertDateSelect.OPTIONS.map((option) => (
      <option value={option.name} key={option.name}>{option.name}</option>
    ));
    const value = AlertDateSelect.determineValue({
      after: this.props.after,
      before: this.props.before,
    });

    return (
      <select onChange={this.handleChange} className="form-control" value={value}>
        <option value="">Any</option>
        {options}
      </select>
    );
  }
}
