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
import { Modal } from 'react-bootstrap';

// Local
import { MonitorModalList } from './MonitorModalList';
import {
  MonitorNested,
  MonitorsByName,
  NormalizedMonitorList
} from '../../../services/monitors/types';
import { Loading } from '../../../components/Loading';
import { observer } from 'mobx-react';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

export interface Props {
  /** If the monitor list is currently loading. */
  isLoading: boolean;
  /** List of monitors that are currently up. */
  monitorsUp: string[];
  /** List of monitors that are currently down. */
  monitorsDown: string[];
  /** If the modal is currently active. */
  isModalActive: boolean;
  /** Monitor to view detailed information on. */
  selectedMonitor?: MonitorNested;
  /**
   * Selects a monitor to view detailed information on.
   * @param monitor ID of the monitor to view.
   */
  selectMonitor(monitor: string): any;
  /** Closes the monitor modal. */
  closeModal(): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a popup that contains stores of the current list of monitors.
 */
@observer
export class MonitorModal extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const loadingIcon = this.props.isLoading ? <Loading /> : null;

    return (
      <Modal show={this.props.isModalActive} onHide={this.props.closeModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title className="text-white">
            Monitors
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="monitor-modal__body">
          <MonitorModalList
            monitorsUp={this.props.monitorsUp}
            monitorsDown={this.props.monitorsDown}
            selectMonitor={this.props.selectMonitor}
            selectedMonitor={this.props.selectedMonitor}
          />
          {loadingIcon}
        </Modal.Body>
      </Modal>
    );
  }
}
