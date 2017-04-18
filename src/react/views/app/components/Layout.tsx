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
import { LocationDescriptor } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import { Header } from './Header';
import { ErrorPopupContainer } from '../containers/ErrorPopupContainer';
import { MapDispatchToProps, MapStateToProps } from '../../../types/redux';
import { setupNotifications } from '../../../services/notifications/actions/notifications';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties passed in from the parent component. */
interface ValueProps {
  /** react-router location descriptor. */
  location: LocationDescriptor;
}

/** Properties passed in from the parent component. */
interface OwnProps {
  /** react-router location descriptor. */
  location: LocationDescriptor;
}

/** Properties that are functions. */
interface FunctionProps {
  /** Activates chrome push notifications. */
  activateNotifications(): void;
}

/** Combined property interfaces. */
type Props = OwnProps & FunctionProps & ValueProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Main page layout for the application.
 */
export class Layout extends React.Component<Props, {}> {
  public componentWillMount(): void {
    this.props.activateNotifications();
  }

  public render(): JSX.Element {
    return (
      <div className="flex-box flex-box--column">
        <div className="flex-item flex--shrink">
          <Header location={this.props.location.pathname || ''} />
        </div>
        {this.props.children}

        <ErrorPopupContainer />
      </div>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Maps redux state variables to the ErrorPopup component.
 * @param state Redux state.
 * @param ownProps
 */
const mapStateToProps: MapStateToProps<ValueProps, OwnProps> = (
  state,
  ownProps,
) => ({
  location: ownProps.location,
});

/**
 * Maps redux dispatch functions to the ErrorPopup component.
 * @param dispatch Redux state dispatch function.
 */
const mapDispatchToProps: MapDispatchToProps<FunctionProps, OwnProps> = (
  dispatch,
) => ({
  activateNotifications: bindActionCreators(setupNotifications, dispatch),
});

/**
 * Container wrapper for the ErrorPopup component.
 */
export const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
