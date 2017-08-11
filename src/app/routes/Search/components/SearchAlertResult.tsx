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
import * as _ from 'lodash';

// Local
import { AlertDetail } from '~/services/alerts/types';
import { JSONFormatter } from '~/components/JSONFormatter';
import { getUserFullName } from '~/services/users/utils/getUserFullName';
import { formatDate } from '~/utils/dateUtils';
import { AlertDetailComment } from '~/routes/AlertDetail/components/AlertDetailComment';
import { AlertListItem } from '~/routes/AlertList/components/AlertListItem';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchAlertResult component. */
interface Props {
  alert: AlertDetail;
}

interface State {
  open: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Information about an alert returned from a search query.
 */
export class SearchAlertResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  public render() {
    const assignedUserName = this.props.alert.assigned_user
      ? getUserFullName(this.props.alert.assigned_user)
      : 'None';
    const comments = this.props.alert.comments.map((comment) => (
      <AlertDetailComment comment={comment}/>
    ));
    const distilleryName = this.props.alert.distillery
      ? this.props.alert.distillery.name
      : 'None';
    const contentDate = this.props.alert.content_date
      ? formatDate(this.props.alert.content_date)
      : 'None';

    return (
      <div>
        <table>
          <AlertListItem alert={this.props.alert} />
        </table>
        <div className="flex-box">
          <div className="flex-item flex--grow content">
            <JSONFormatter json={this.props.alert.data} />
          </div>
          <div className="flex-item flex--grow content">
            {comments}
          </div>
        </div>
      </div>
    );
  }
}
