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
import * as classnames from 'classnames';

// Local
import { AlertLevelIcon } from '../../../services/alerts/components/AlertLevelIcon';
import { AlertStatusIcon } from '../../../services/alerts/components/AlertStatusIcon';
import { AlertListItem as Alert } from '../../../services/alerts/types';
import { getUserFullName } from '../../../services/users/utils/getUserFullName';
import { formatDate } from '../../../utils/formatDate';
import { shortenDistilleryName } from '../../../services/distilleries/utils/distilleryUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertListItem component. */
interface Props {
  /** Alert to display. */
  alert: Alert;
  /** Currently selected alert's ID. */
  selectedAlert: number | null;
  /**
   * Selects an alerts to view in the alert detail.
   * @param alertId
   */
  selectAlert(alertId: number): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a table row with an overview of the given alert.
 */
export class AlertListItem extends React.Component<Props, {}> {
  /**
   * Selects this alerts to be viewed in the alert detail view.
   */
  public selectAlert = (): void => {
    this.props.selectAlert(this.props.alert.id);
  };

  public render(): JSX.Element {
    const { alert } = this.props;
    const distilleryName = alert.distillery
      ? shortenDistilleryName(alert.distillery.name)
      : 'None';
    const isActive = (this.props.selectedAlert === alert.id);
    const classes = classnames(
      'alert-list-item',
      `alert-list-item--${alert.level.toLowerCase()}`,
      { active: isActive },
    );
    const user = alert.assigned_user
      ? getUserFullName(alert.assigned_user)
      : 'Unassigned';

    return (
      <tr className={classes} onClick={this.selectAlert}>
        <td><AlertLevelIcon level={alert.level}/></td>
        <td><AlertStatusIcon status={alert.status}/></td>
        <td className="text--muted">
          {formatDate(alert.created_date)}
        </td>
        <td className="text--emphasis">
          {distilleryName}
        </td>
        <td><span className="badge">{alert.incidents}</span></td>
        <td>
          <div className="flex-box">
            <div className="alert-list-item__title flex-item">
              {alert.title}
              <div className="alert-list-item__gradient"/>
            </div>
            <div className="alert-list-item__user flex-item flex--shrink">
              <span className="text--emphasis">
                {user}
              </span>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
