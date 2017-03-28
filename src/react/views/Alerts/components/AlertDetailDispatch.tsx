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
import { JSONFormatter } from '../../../components/JSONFormatter';
import { DispatchNested } from '../../../api/dispatches/types';
import { getUserFullName } from '../../../api/users/utils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailDispatch component. */
interface Props {
  /** Dispatch object to display. */
  dispatch: DispatchNested;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an alert dispatch.
 */
export class AlertDetailDispatch extends React.Component<Props, {}> {
  /**
   * Renders the component.
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div key={this.props.dispatch.id} className="alert-dispatch">
        <div className="clearfix list-title">
          {this.props.dispatch.title}
          <span className="pull-right">
            <span className="badge">
              {getUserFullName(this.props.dispatch.issued_by)}
            </span>
          </span>
        </div>
        <JSONFormatter json={this.props.dispatch.data} />
      </div>
    );
  }
}
