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

// Local
import { AlertDetailLevelSelect } from './AlertDetailLevelSelect';
import { AlertDetailStatusSelect } from './AlertDetailStatusSelect';
import { AlertDetailUserSelect } from './AlertDetailUserSelect';
import { AlertDetailOutcomeSelect } from './AlertDetailOutcomeSelect';
import {
  AlertUpdateFields,
  AlertDetail,
} from '../../../api/alerts/types';
import { User } from '../../../api/users/types';
import { CONFIG } from '../../../config';
import { shortenDistilleryName } from '../../../api/distilleries/utils';
import { formatDate } from '../../../utils/formatDate';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailOverview component. */
interface Props {
  /** Alert to display the details of. */
  alert: AlertDetail;
  /** List of current users. */
  users: User[];
  /**
   * Updates the fields of an alert.
   * @param alertId ID of the alert to update.
   * @param fields Fields to change.
   */
  updateAlert(alertId: number, fields: AlertUpdateFields): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list of details about a given alerts.
 */
export class AlertDetailOverview extends React.Component<Props, {}> {
  /**
   * Popover for the assign to self button.
   * @type {JSX.Element}
   */
  public static assignToSelfOverlay = (
    <Popover id="alert-detail-assign-to-me-overlay">
      Assign to Self
    </Popover>
  );

  /**
   * Popover for the unassign button.
   * @type {JSX.Element}
   */
  public static unassignOverlay = (
    <Popover id="alert-detail-unassign-overlay">
      Unassign
    </Popover>
  );

  /**
   * Changes the alerts level.
   * @param level
   */
  public selectLevel = (level: string): void => {
    this.props.updateAlert(this.props.alert.id, { level });
  };

  /**
   * Changes the alerts status.
   * @param status
   */
  public selectStatus = (status: string): void => {
    this.props.updateAlert(this.props.alert.id, { status });
  };

  /**
   * Changes the user assigned to the alerts.
   * @param assignedUser
   */
  public selectUser = (assignedUser: number): void => {
    this.props.updateAlert(
      this.props.alert.id,
      { assigned_user: assignedUser },
    );
  };

  /**
   * Changes the outcome of the alerts.
   * @param outcome
   */
  public selectOutcome = (outcome: string): void => {
    this.props.updateAlert(this.props.alert.id, { outcome });
  };

  /**
   * Assigns the alerts to the current user.
   */
  public assignToSelf = (): void => {
    this.props.updateAlert(
      this.props.alert.id,
      { assigned_user: CONFIG.CURRENT_USER.id },
    );
  };

  /**
   * Unassigns the current alerts.
   */
  public unassign = (): void => {
    this.props.updateAlert(this.props.alert.id, { assigned_user: null });
  };

  public render(): JSX.Element {
    const assignedUser = this.props.alert.assigned_user;
    const assignToSelfDisabled = assignedUser
      ? assignedUser.id === CONFIG.CURRENT_USER.id
      : false;
    const unnassignDisabled = assignedUser === null;
    const contentDate = this.props.alert.content_date
      ? formatDate(this.props.alert.content_date)
      : 'Unknown';

    return (
      <div className="spacing-section">
        <h3 className="sub-title">Details</h3>
        <dl className="dl-horizontal spacing-section">
          <dt>Data Created:</dt>
          <dd>{contentDate}</dd>

          <dt>Alert Created:</dt>
          <dd>{formatDate(this.props.alert.created_date)}</dd>

          <dt>Source:</dt>
          <dd>{shortenDistilleryName(this.props.alert.distillery.name)}</dd>

          <dt>Level:</dt>
          <dd>
            <AlertDetailLevelSelect
              currentLevel={this.props.alert.level}
              selectLevel={this.selectLevel}
            />
          </dd>

          <dt>Status:</dt>
          <dd>
            <AlertDetailStatusSelect
              currentStatus={this.props.alert.status}
              selectStatus={this.selectStatus}
            />
          </dd>

          <dt>
            Assigned:
            <OverlayTrigger
              overlay={AlertDetailOverview.assignToSelfOverlay}
              placement="top"
              animation={false}
            >
              <button
                className="alert-detail__assign-btn"
                onClick={this.assignToSelf}
                disabled={assignToSelfDisabled}
              >
                <i className="fa fa-plus" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={AlertDetailOverview.unassignOverlay}
              placement="top"
              animation={false}
            >
              <button
                className="alert-detail__assign-btn"
                onClick={this.unassign}
                disabled={unnassignDisabled}
              >
                <i className="fa fa-minus" />
              </button>
            </OverlayTrigger>
          </dt>
          <dd>
            <AlertDetailUserSelect
              currentUser={this.props.alert.assigned_user}
              users={this.props.users}
              selectUser={this.selectUser}
            />
          </dd>

          <dt>Outcome:</dt>
          <dd>
            <AlertDetailOutcomeSelect
              currentOutcome={this.props.alert.outcome}
              selectOutcome={this.selectOutcome}
            />
          </dd>

          <dt>Incidents:</dt>
          <dd><span className="badge">{this.props.alert.incidents}</span></dd>
        </dl>
      </div>
    );
  }
}
