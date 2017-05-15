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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { MonitorModal } from './MonitorModal';
import { NormalizedMonitorList } from '../../../services/monitors/types';
import {
  StateToProps,
  DispatchToProps,
} from '../../../types/redux';
import {
  fetchMonitors,
  selectMonitor,
  closeModal,
  openModal,
} from '../actions/MonitorStatusActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Value properties of the MonitorStatus component. */
interface ValueProps {
  /** If a loading icon should be shown in the monitor modal. */
  loading: boolean;
  /** Indexed list of current monitor objects. */
  monitors: NormalizedMonitorList | null;
  /** Monitors that are currently running. */
  monitorsUp: string[];
  /** Monitors that are currently down. */
  monitorsDown: string[];
  /** If the monitor modal is active. */
  modalActive: boolean;
  /** Selected monitor from the current list of indexed monitors. */
  selectedMonitor: string | null;
}

/** Function properties of the MonitorStatus component. */
interface FunctionProps {
  /**
   * Selects a monitor from the list.
   * @param monitor ID of the monitor to select.
   */
  selectMonitor(monitor: string): any;
  /** Closes the monitor modal. */
  closeModal(): any;
  /** Opens the monitor modal. */
  openModal(): any;
  /** Gets the current list of monitors. */
  fetchMonitors(): any;
}

/** Combined property interfaces for the MonitorStatus component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays two icons that show how many monitors are up and down, and once
 * clicked displays a modal with the information of all the monitors.
 */
export class MonitorStatus extends React.Component<Props, {}> {
  /**
   * Fetches the current monitor list.
   */
  public componentWillMount(): void {
    this.props.fetchMonitors();
  }

  public render(): JSX.Element {
    return (
      <div className="flex-item flex--shrink">
        <a className="header__link" onClick={this.props.openModal}>
          {this.props.monitorsUp.length + ' '} <i className="fa fa-arrow-up" />
          {' '}
          {this.props.monitorsDown.length + ' '} <i className="fa fa-arrow-down" />

          <MonitorModal
            loading={this.props.loading}
            closeModal={this.props.closeModal}
            modalActive={this.props.modalActive}
            monitors={this.props.monitors}
            monitorsDown={this.props.monitorsDown}
            monitorsUp={this.props.monitorsUp}
            selectMonitor={this.props.selectMonitor}
            selectedMonitor={this.props.selectedMonitor}
          />
        </a>
      </div>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Maps the current redux state to the MonitorStatus component.
 * @param state
 */
const values: StateToProps<ValueProps, undefined> = (state) => ({
  loading: state.routes.App.MonitorStatus.loading,
  modalActive: state.routes.App.MonitorStatus.modalActive,
  monitors: state.routes.App.MonitorStatus.monitors,
  monitorsDown: state.routes.App.MonitorStatus.monitorsDown,
  monitorsUp: state.routes.App.MonitorStatus.monitorsUp,
  selectedMonitor: state.routes.App.MonitorStatus.selectedMonitor,
});

/**
 * Maps redux dispatch actions to the MonitorStatus component.
 * @param dispatch
 */
const functions: DispatchToProps<FunctionProps, undefined> = (dispatch) => ({
  closeModal: bindActionCreators(closeModal, dispatch),
  fetchMonitors: bindActionCreators(fetchMonitors, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  selectMonitor: bindActionCreators(selectMonitor, dispatch),
});

/** Container of the MonitorStatus component. */
export const MonitorStatusContainer = connect(
  values,
  functions,
)(MonitorStatus);
