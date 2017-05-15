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
import { bindActionCreators as bind } from 'redux';
import {
  ComponentClass,
  connect,
} from 'react-redux';

// Local
import {
  DispatchToProps,
  StateToProps,
} from '../../../types/redux';
import {
  ValueProps,
  FunctionProps,
  Dashboard,
} from '../components/Dashboard';
import * as actions from '../actions/DashboardActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Container properties. */
interface ContainerProps {}

/** Function that maps the redux state to the wrapped component. */
type Values = StateToProps<ValueProps, ContainerProps>;

/** Function that maps redux dispatch functions to the wrapped component. */
type Functions = DispatchToProps<FunctionProps, ContainerProps>;

/** Container type. */
type Container = ComponentClass<ContainerProps>;

// --------------------------------------------------------------------------
// Property Mapping
// --------------------------------------------------------------------------

/**
 * Maps the redux state to wrapped component properties.
 * @param state Redux state.
 * @param props Container properties.
 */
const values: Values = (state, props) => ({
  days: state.routes.Dashboard.Dashboard.days,
  totalAlerts: state.routes.Dashboard.Dashboard.total,
  levelDistribution: state.routes.Dashboard.Dashboard.levelDistributionData,
  levelDistributionLoading: state.routes.Dashboard.Dashboard.levelDistributionLoading,
  statusDistribution: state.routes.Dashboard.Dashboard.statusDistributionData,
  statusDistributionLoading: state.routes.Dashboard.Dashboard.statusDistributionLoading,
  collectionDistribution: state.routes.Dashboard.Dashboard.collectionDistributionData,
  collectionDistributionLoading: state.routes.Dashboard.Dashboard.collectionDistributionLoading,
  levelTimeseries: state.routes.Dashboard.Dashboard.levelTimeseriesData,
  levelTimeseriesLoading: state.routes.Dashboard.Dashboard.levelTimeseriesLoading,
  locations: state.routes.Dashboard.Dashboard.locations,
  locationFeatureCount: state.routes.Dashboard.Dashboard.locationFeatureCount,
  locationsLoading: state.routes.Dashboard.Dashboard.locationsLoading,
});

/**
 * Maps redux dispatch functions to wrapped component properties.
 * @param dispatch Dispatch function for the redux store.
 */
const functions: Functions = (dispatch) => ({
  getAlertStatistics: bind(actions.fetchAlertStatistics, dispatch),
});

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Container for the Dashboard component.
 * @type {Container}
 */
export const DashboardContainer: Container = connect(
  values,
  functions,
)(Dashboard);
