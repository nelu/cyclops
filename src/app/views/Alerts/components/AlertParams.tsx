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
import { Popover, OverlayTrigger } from 'react-bootstrap';

// Local
import { Distillery } from '../../../api/distilleries/types';
import { AlertSearchParams } from '../../../api/alerts/types';
import { User } from '../../../api/users/types';
import { AlertParamsLevelSelect } from './AlertParamsLevelSelect';
import { AlertParamsStatusSelect } from './AlertParamsStatusSelect';
import { AlertParamsUserSelect } from './AlertParamsUserSelect';
import { AlertParamsDistillerySelect } from './AlertParamsDistillerySelect';
import { AlertDateSelect } from './AlertDateSelect';
import { AlertParamsDateSelect } from './AlertParamsDateSelect';
import { formatDate } from '../../../utils/formatDate';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParams component. */
interface Props {
  /** List of all the distilleries that have alerts associated with them. */
  distilleries: Distillery[];
  /** Currently selected alerts list search parameters. */
  params: AlertSearchParams;
  /** Current list of all users. */
  users: User[];
  /**
   * Changes the current alerts list search parameters.
   * @param params Parameters to change to.
   */
  changeParams(params: AlertSearchParams): any;
}

/** Internal state of the AlertParams component. */
interface State {
  /** If a panel that allows users to filter alerts by time is shown. */
  timePanelActive: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a sidebar of possible alerts search parameters.
 */
export class AlertParams extends React.Component<Props, State> {
  /**
   * Popover element that displays a tooltip for analyzing alerts data.
   * @type {JSX.Element}
   */
  public static clearTimePopover: JSX.Element = (
    <Popover id="alert-params-clear-time">Clear Filter</Popover>
  );

  /**
   * Popover element that displays a tooltop for close the alerts.
   * @type {JSX.Element}
   */
  public static chooseTimePopover: JSX.Element = (
    <Popover id="alert-detail-choose-time">Expand Choices</Popover>
  );

  constructor(props: Props) {
    super(props);

    this.state = { timePanelActive: false };
  }

  /**
   * Selects the level to filter alerts by.
   * @param level
   */
  public selectLevel = (level: string | string[] | undefined) => {
    this.props.changeParams({ level });
  };

  /**
   * Selects the status to filter alerts by.
   * @param status
   */
  public selectStatus = (status: string | string[] | undefined) => {
    this.props.changeParams({ status });
  };

  /**
   * Selects the user to filter alerts by.
   * @param user
   */
  public selectUser = (user: number | undefined): void => {
    this.props.changeParams({ assigned_user: user });
  };

  /**
   * Selects the distillery to filter alerts by.
   * @param distillery
   */
  public selectDistillery = (distillery: number | undefined): void => {
    this.props.changeParams({ collection: distillery });
  };

  /**
   * Selects the time to filter alerts by.
   * @param timeObject
   */
  public selectTime = (timeObject: { after?: string, before?: string }): void => {
    this.props.changeParams(timeObject);
  };

  /**
   * Opens the time choice side panel.
   */
  public openTimePanel = (): void => {
    this.setState({ timePanelActive: true });
  };

  /**
   * Closes the time choice side panel.
   */
  public closeTimePanel = (): void => {
    this.setState({ timePanelActive: false });
  };

  /**
   * Clears the currently filtered time.
   */
  public clearTime = (): void => {
    this.props.changeParams({ after: undefined, before: undefined });
  };

  public render(): JSX.Element {
    const { params, users, distilleries } = this.props;
    const { selectLevel, selectStatus, selectUser, selectDistillery } = this;
    const timePanel = this.state.timePanelActive
      ?
      (
        <AlertParamsDateSelect
          after={params.after}
          before={params.before}
          selectDate={this.selectTime}
          close={this.closeTimePanel}
        />
      )
      : null;
    const timePanelToggle = this.state.timePanelActive
      ? this.closeTimePanel
      : this.openTimePanel;
    const timeDisplay = this.props.params.after || this.props.params.before
      ?
      (
        <div className="alert-list-params__time-range">
          <div>{params.after ? formatDate(params.after) : 'Any'}</div>
          <div><b>-</b></div>
          <div>{params.before ? formatDate(params.before) : 'Any'}</div>
        </div>
      )
      : null;

    return (
      <section className="alert-list-params flex-box flex-box--column flex--shrink">
        <div className="alert-list-params__container flex-item">
          <AlertParamsLevelSelect
            currentLevel={params.level}
            selectLevel={selectLevel}
          />

          <AlertParamsStatusSelect
            currentStatus={params.status}
            selectStatus={selectStatus}
          />

          <AlertParamsDistillerySelect
            currentDistillery={params.collection}
            distilleries={distilleries}
            selectDistillery={selectDistillery}
          />

          <div className="alert-list-params__spacer alert-list-params__group">
            <h3 className="sub-title">Time</h3>
            <div className="flex-box form-group">
              <div className="flex-item">
                <AlertDateSelect
                  after={params.after}
                  before={params.before}
                  changeTime={this.selectTime}
                />
              </div>
              <div className="flex--shrink">
                <div className="alert-list-params__btn-group btn-group btn-group-alt">
                  <OverlayTrigger
                    overlay={AlertParams.clearTimePopover}
                    placement="bottom"
                    animation={false}
                  >
                    <button
                      className="btn btn-alt"
                      onClick={this.clearTime}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={AlertParams.chooseTimePopover}
                    placement="bottom"
                    animation={false}
                  >
                    <button
                      className="btn btn-alt"
                      onClick={timePanelToggle}
                    >
                      <i className="fa fa-caret-right" />
                    </button>
                  </OverlayTrigger>
                </div>
              </div>

              {timeDisplay}
            </div>
          </div>

          <AlertParamsUserSelect
            users={users}
            currentUser={params.assigned_user}
            selectUser={selectUser}
          />
        </div>
        {timePanel}
      </section>
    );
  }
}
