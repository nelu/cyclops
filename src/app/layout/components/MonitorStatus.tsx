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
import { observer } from 'mobx-react';

// Local
import { MonitorModalContainer } from '../containers/MonitorModalContainer';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Value properties of the MonitorStatus component. */
interface Props {
  /** Monitors that are currently running. */
  monitorsUp: number;
  /** Monitors that are currently down. */
  monitorsDown: number;
  /** Opens the monitor modal. */
  openModal(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays two icons that show how many monitors are up and down, and once
 * clicked displays a modal with the information of all the monitors.
 */
@observer
export class MonitorStatus extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <div className="flex-item flex--shrink">
        <a className="header__link" onClick={this.props.openModal}>
          {this.props.monitorsUp + ' '} <i className="fa fa-arrow-up" />
          {' '}
          {this.props.monitorsDown + ' '} <i className="fa fa-arrow-down" />

          <MonitorModalContainer />
        </a>
      </div>
    );
  }
}
