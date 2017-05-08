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
import { AlertDetailOutcome } from '../containers/AlertDetailOutcome';
import {
  AlertUpdateRequest,
  AlertDetail,
  AlertLevelChoices,
  AlertStatusChoices,
  Alert,
  AlertOutcomeChoices,
} from '../../../api/alerts/types';
import { User } from '../../../api/users/types';
import { CONFIG } from '../../../config';
import { shortenDistilleryName } from '../../../api/distilleries/utils';
import { formatDate } from '../../../utils/formatDate';
import { AlertStatusIcon } from './AlertStatusIcon';
import { STATUS_OPTIONS } from '../constants';
import { AlertDetailUnassignButton } from './AlertDetailUnassignButton';
import { AlertDetailSelfAssignButton } from './AlertDetailSelfAssignButton';
import { AlertDetailOutcomeRemove } from './AlertDetailOutcomeRemove';

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
   * @param alert Alert object to update.
   * @param fields Fields to change.
   */
  updateAlert(alert: Alert, fields: AlertUpdateRequest): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a list of details about a given alerts.
 */
export class AlertDetailOverview extends React.Component<Props, {}> {
  /**
   * Changes the alerts level.
   * @param level
   */
  public selectLevel = (level: AlertLevelChoices): void => {
    this.props.updateAlert(this.props.alert, { level });
  };

  /**
   * Changes the alerts status.
   * @param status
   */
  public selectStatus = (status: AlertStatusChoices): void => {
    this.props.updateAlert(this.props.alert, { status });
  };

  /**
   * Changes the user assigned to the alerts.
   * @param assignedUser
   */
  public selectUser = (assignedUser: number): void => {
    this.props.updateAlert(
      this.props.alert,
      { assigned_user: assignedUser },
    );
  };

  /**
   * Changes the outcome of the alerts.
   * @param outcome
   */
  public selectOutcome = (outcome: AlertOutcomeChoices): void => {
    this.props.updateAlert(this.props.alert, { outcome });
  };

  /**
   * Assigns the alerts to the current user.
   */
  public assignToSelf = (): void => {
    this.props.updateAlert(
      this.props.alert,
      { assigned_user: CONFIG.CURRENT_USER.id },
    );
  };

  /**
   * Unassigns the current alerts.
   */
  public unassign = (): void => {
    this.props.updateAlert(this.props.alert, { assigned_user: null });
  };

  /**
   * Removes the current alert outcome.
   */
  public removeOutcome = (): void => {
    this.props.updateAlert(this.props.alert, { outcome: null });
  };

  public render(): JSX.Element {
    const contentDate = this.props.alert.content_date
      ? formatDate(this.props.alert.content_date)
      : 'Unknown';
    const distilleryName = this.props.alert.distillery
      ? shortenDistilleryName(this.props.alert.distillery.name)
      : 'None';

    return (
      <div className="spacing-section">
        <h3 className="sub-title">Details</h3>
        <dl className="dl-horizontal spacing-section">
          <dt>Data Created:</dt>
          <dd>{contentDate}</dd>

          <dt>Alert Created:</dt>
          <dd>{formatDate(this.props.alert.created_date)}</dd>

          <dt>Source:</dt>
          <dd>{distilleryName}</dd>

          <dt>Level:</dt>
          <dd>
            <AlertDetailLevelSelect
              currentLevel={this.props.alert.level}
              selectLevel={this.selectLevel}
            />
          </dd>

          <dt>Status:</dt>
          <dd>
            <AlertStatusIcon status={this.props.alert.status}/>
            <span className="alert-icon-spacing">
              {STATUS_OPTIONS[this.props.alert.status].name}
            </span>
          </dd>

          <dt>
            Assigned:
            <AlertDetailSelfAssignButton
              user={this.props.alert.assigned_user}
              assign={this.assignToSelf}
            />
            <AlertDetailUnassignButton
              user={this.props.alert.assigned_user}
              status={this.props.alert.status}
              unassign={this.unassign}
            />
          </dt>
          <dd>
            <AlertDetailUserSelect
              currentUser={this.props.alert.assigned_user}
              users={this.props.users}
              selectUser={this.selectUser}
            />
          </dd>

          <dt>Incidents:</dt>
          <dd><span className="badge">{this.props.alert.incidents}</span></dd>
        </dl>
      </div>
    );
  }
}
