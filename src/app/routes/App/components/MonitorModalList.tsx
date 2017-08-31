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
import { ListGroup } from 'react-bootstrap';

// Local
import { MonitorDetail } from './MonitorModalDetail';
import {
  MonitorNested,
  NormalizedMonitorList
} from '../../../services/monitors/types';
import {
  denormalizeMonitors,
  denormalizeMonitor,
} from '../../../services/monitors/utils/monitorUtils';
import { MonitorModalListItem } from './MonitorModalListItem';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the MonitorModalList component. */
interface Props {
  /** Monitor names that are currently up. */
  monitorsUp: string[];
  /** Monitor names that are currently down. */
  monitorsDown: string[];
  /** Name of the currently selected monitor. */
  selectedMonitor?: MonitorNested;
  /**
   * Selects a monitor to view more detailed information on.
   * @param monitor
   */
  selectMonitor(monitor: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * List of the current monitors sorted by their status.
 */
export class MonitorModalList extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const selectedMonitorName = this.props.selectedMonitor
      ? this.props.selectedMonitor.name
      : undefined;
    const monitorsDown = this.props.monitorsDown.map((name) => (
      <MonitorModalListItem
        monitorName={name}
        selectedMonitorName={selectedMonitorName}
        selectMonitor={this.props.selectMonitor}
      />
    ));
    const monitorsUp = this.props.monitorsUp.map((name) => (
      <MonitorModalListItem
        monitorName={name}
        selectedMonitorName={selectedMonitorName}
        selectMonitor={this.props.selectMonitor}
      />
    ));
    const monitorDetail = this.props.selectedMonitor ? (
      <MonitorDetail monitor={this.props.selectedMonitor}/>
    ) : (
      <h4 className="text-center">No Monitor Selected</h4>
    );

    return (
      <div className="flex-box">
        <div className="flex-item flex--shrink monitor-sidebar">
          <div className="monitor-sidebar__heading">
            <i className="fa fa-arrow-down" />
            {' ' + this.props.monitorsDown.length} Down
          </div>
          <ListGroup>
            {monitorsDown}
          </ListGroup>

          <div className="monitor-sidebar__heading">
            <i className="fa fa-arrow-up" />
            {' ' + this.props.monitorsUp.length} Up
          </div>
          <ListGroup>
            {monitorsUp}
          </ListGroup>
        </div>
        <div className="flex-item">
          {monitorDetail}
        </div>
      </div>
    );
  };
}
