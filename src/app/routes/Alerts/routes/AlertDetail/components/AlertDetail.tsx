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
import { LocationDescriptorObject, History } from 'history';
import { match } from 'react-router-dom';
import * as classnames from 'classnames';

// Local
import {
  Alert,
  AlertDetail as AlertDetailResponse,
  AlertOutcomeChoices,
  AlertUpdateRequest,
} from '~/services/alerts/types';
import { Loading } from '~/components/Loading';
import { AlertDetailComments } from './AlertDetailComments';
import { AlertDetailOverview } from './AlertDetailOverview';
import { AlertDetailActions } from './AlertDetailActions';
import { AlertDetailHeader } from './AlertDetailHeader';
import { AlertDetailOutcomeContainer } from '../containers/AlertDetailOutcomeContainer';
import {
  LocationFieldAddress,
  Markers,
  PopupGenerator,
  LocationAddressPoint,
} from '~/services/map/types';
import { SpacedSection } from '~/components/SpacedSection';
import { SubTitle } from '~/components/SubTitle';
import { Map } from '~/services/map/components/Map';
import { JSONFormatter } from '~/components/JSONFormatter';
import { User } from '~/services/users/types';
import { AlertDataModalContainer } from '../containers/AlertDataModalContainer';
import { ResultIPAdresses, Result } from '~/types/result';
import { Action } from '~/services/actions/types';
import { Container } from '~/services/containers/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetail component that are values. */
interface Props {
  /** Alert to display detailed info on. */
  alert?: AlertDetailResponse;
  alertID?: number;
  /** Current list of actions to perform on the alert. */
  actions: Action[];
  /** List of current users. */
  users: User[];
  /** If the current alerts is being fetched or altered. */
  isLoading: boolean;
  /** GeoJSON markers of the current alerts location. */
  markers?: Markers;
  /** Alert location, field the location was found on, and the address. */
  locations: LocationFieldAddress[];
  /** IP addresses of the alert stores. */
  ipAddresses?: ResultIPAdresses;
  /** If the alert stores modal is active. */
  modalActive: boolean;
  /** Error message related to the alert detail. */
  errors: string[];
  /** React router location. */
  location: LocationDescriptorObject;
  /** React router object. */
  history: History;
  match: match<Params>;
  /**
   * Adds a comment to the alert.
   * @param comment Comment to add to the alert.
   */
  addComment(comment: string): any;
  /** Closes the alert detail. */
  onClose(): any;
  /** Closes any alert update error messages. */
  closeErrors(): any;
  /**
   * Opens a modal used to analyze the alert stores.
   */
  openModal(): any;
  /**
   * Performs an action on the alert.
   * @param alertId ID of the alert to perform the action on.
   * @param actionId ID of the action to perform.
   */
  performAction(alertId: number, actionId: number): any;
  /**
   * Updates the fields of the alert.
   * @param fields Fields to update.
   */
  updateAlert(fields: AlertUpdateRequest): any;
  /**
   * Fetches the alerts from the API to display.
   * @param alertId
   */
  viewAlert(alertId: number): any;
}

/**
 * URL parameters passed in from react-router
 */
interface Params {
  /** ID of the alert to view. */
  id: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays detailed alert information in a sidebar.
 */
export class AlertDetail extends React.Component<Props, {}> {
  /**
   * Popup generator for the map.
   * @param feature
   */
  public static popupGenerator: PopupGenerator = (
    feature: GeoJSON.Feature<LocationAddressPoint>,
  ) => (
    `<b>Field:</b> ${feature.properties.field}<br />` +
    `<b>Address:</b> ${feature.properties.address}`
  );

  /**
   * Retrieves the alerts stores of the currently selected alerts.
   */
  public componentWillMount(): void {
    this.props.viewAlert(this.getAlertID());
  }

  /**
   * Compares the current alerts elementId with the previous alerts
   * elementId and fetches a new alert if the two don't match.
   * @param {Object} props The next passed in properties.
   */
  public componentWillReceiveProps(props: Props) {
    const currentAlertId = this.getAlertID();
    const newAlertId = parseInt(props.match.params.id, 10);

    if (currentAlertId !== newAlertId) { this.props.viewAlert(newAlertId); }
  }

  /**
   * Removes the current alerts information from the redux store when
   * the component unmounts.
   */
  public componentWillUnmount() {
    this.props.onClose();
  }

  /**
   * Gets the alert ID based on the current route parameters.
   */
  public getAlertID = (): number => {
    return parseInt(this.props.match.params.id, 10);
  };

  /**
   * Changes the url to the base alerts list url with the current
   * alerts search parameters in the url.
   */
  public dismissAlert = (): void => {
    this.props.history.push({
      pathname: '/alerts/',
      query: this.props.location.query,
    });
  };

  /**
   * Updates the notes property on the alert with new notes.
   * @param notes
   */
  public updateNotes = (notes: string): void => {
    if (this.props.alert) {
      this.props.updateAlert({ notes });
    }
  };

  /**
   * Changes the alert outcome and notes.
   * @param outcome Alert outcome to change to.
   * @param notes Notes describing the reason behind the outcome.
   */
  public selectOutcome = (
    outcome: AlertOutcomeChoices,
    notes: string,
  ): void => {
    if (this.props.alert) {
      this.props.updateAlert({ outcome, notes });
    }
  };

  /**
   * Renders an HTML element based on the current properties.
   */
  public render() {
    const popupGenerator = AlertDetail.popupGenerator;

    const map = this.props.markers ? (
      <SpacedSection>
        <SubTitle>
          Locations
          <span className="text--base"> {this.props.markers.features.length}</span>
        </SubTitle>
        <Map
          controls={true}
          markers={this.props.markers}
          options={{ scrollZoom: false }}
          popupGenerator={popupGenerator}
        />
      </SpacedSection>
    ) : null;
    const alertHeaderElement = this.props.alert ? (
      <AlertDetailHeader
        alertContainer={this.props.alert.distillery ? this.props.alert.distillery.container : undefined}
        alertId={this.props.alert.id}
        alertLevel={this.props.alert.level}
        onClose={this.dismissAlert}
        alertData={this.props.alert.data}
        onClick={this.props.openModal}
      />
    ) : null;
    const alertDetailErrorClasses = classnames(
      'flex-item',
      'flex--shrink',
      'alert-detail__errors',
      `alert-detail__errors--${this.props.alert ? this.props.alert.level.toLowerCase() : ''}`,
      { 'alert-detail__errors--open': !!this.props.errors.length },
    );
    const errors = this.props.errors.map((error, index) => (
      <p key={index}>{error}</p>
    ));
    const errorsTitle = this.props.errors.length
      ? (
        <h3>
          Errors
          <button
            className="btn-close"
            onClick={this.props.closeErrors}
          >
            <i className="fa fa-close " />
          </button>
        </h3>
      ) : null;
    const alertDetailErrors = alert
      ? (
        <div className={alertDetailErrorClasses}>
          {errorsTitle}
          {errors}
        </div>
      ) : null;
    const alertDetailElement = this.props.alert ? (
      <div className="flex-item content">
        <div className="spacing-section">
          <h3 className="sub-title">Title</h3>
          <div>{this.props.alert.title}</div>
        </div>

        <AlertDetailOverview
          alert={this.props.alert}
          updateAlert={this.props.updateAlert}
          users={this.props.users}
        />

        {map}

        <AlertDetailOutcomeContainer alert={this.props.alert} />

        <AlertDetailComments
          comments={this.props.alert.comments}
          addComment={this.props.addComment}
        />

        <AlertDetailActions
          alertId={this.props.alert.id}
          actions={this.props.actions}
          dispatches={this.props.alert.dispatches}
          performAction={this.props.performAction}
        />

        <SpacedSection>
          <SubTitle>Data</SubTitle>
          <JSONFormatter json={this.props.alert.data} open={5} />
        </SpacedSection>

        <AlertDataModalContainer />

      </div>
    ) : null;

    return (
      <section className="alert-detail flex-box flex-box--column flex--shrink">
        {alertHeaderElement}
        {alertDetailErrors}
        {alertDetailElement}
        {this.props.isLoading ? <Loading /> : null}
      </section>
    );
  }
}
