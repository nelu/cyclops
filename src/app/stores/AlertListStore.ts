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
import { observable, action } from 'mobx';

// Local
import {
  AlertListItem,
  AlertSearchParams,
} from '~/services/alerts/types';
import { fetchAlertList } from '~/services/alerts/utils/alertsAPI';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { fetchAllAlertDistilleries } from '~/services/distilleries/utils/distilleryAPI';
import { RootStore } from '~/stores';

/**
 * Interval to poll for alerts.
 * @type {number}
 */
const POLLING_INTERVAL = 5000;

export class AlertListStore {
  @observable public alerts: AlertListItem[] = [];
  @observable public count: number = 0;
  @observable public distilleries: DistilleryMinimal[] = [];
  @observable public isLoading: boolean = false;
  @observable public isPolling: boolean = true;

  private isPollingEnabled: boolean = true;
  private params: AlertSearchParams = {};
  private promiseID?: symbol;
  private stores: RootStore;
  private timeoutID?: number;

  constructor(root: RootStore) {
    this.stores = root;
  }

  /**
   * Searches for alerts that match the given search parameters. Continues
   * polling for more if polling is enabled.
   * @param {AlertSearchParams} params
   * @returns {Promise<void>}
   */
  @action
  public search = (params: AlertSearchParams): Promise<void> => {
    const promiseID = this.resetPromiseID();

    this.clearPollingTimeout();
    this.isLoading = true;
    this.params = params;

    return fetchAlertList(params)
      .then((response) => {
        if (this.isValidPromiseID(promiseID)) {
          this.alerts = response.results;
          this.count = response.count;
          this.isLoading = false;

          if (this.isPollingEnabled) { this.setPollingTimeout(promiseID); }
        }
      })
      .catch((error) => {
        this.stores.errorStore.addError(error);
        this.isLoading = false;
      });
  };

  /**
   * Fetches distilleries that have alerts created from their distilled stores.
   * @returns {Promise<void>}
   */
  @action
  public fetchAlertDistilleries = (): Promise<void> => {
    return fetchAllAlertDistilleries().then((distilleries) => {
      this.distilleries = distilleries;
    });
  };

  /**
   * Toggles polling of the alert list.
   */
  @action
  public togglePolling = (): void => {
    if (this.isPollingEnabled) {
      this.resetPromiseID();
      this.clearPollingTimeout();
    } else {
      this.poll();
    }

    this.isPollingEnabled = !this.isPollingEnabled;
  };

  /**
   * Polls for alerts based on the stored search parameters from a
   * previous search.
   * @returns {Promise<void>}
   */
  @action
  private poll = (): Promise<void> => {
    const promiseID = this.resetPromiseID();

    this.clearPollingTimeout();

    return fetchAlertList(this.params)
      .then((response) => {
        if (this.isValidPromiseID(promiseID)) {
          this.alerts = response.results;
          this.count = response.count;

          this.setPollingTimeout(promiseID);
        }
      })
      .catch((error) => {
        this.stores.errorStore.addError(error);
      });
  };

  /**
   * Determines if the given promise ID is equal to the most recent
   * promise ID.
   * @param {symbol} promiseID
   * @returns {boolean}
   */
  private isValidPromiseID = (promiseID: symbol): boolean => {
    return this.promiseID === promiseID;
  };

  /**
   * Resets the current promise ID to a new symbol.
   * @returns {symbol} The new promise ID.
   */
  @action
  private resetPromiseID = (): symbol => {
    const promiseID = Symbol();

    this.promiseID = promiseID;

    return promiseID;
  };

  /**
   * Sets a timeout function that polls for alerts and saves it's ID.
   * @param {symbol} promiseID ID of the promise that made the initial search.
   */
  @action
  private setPollingTimeout = (promiseID: symbol): void => {
    if (!this.isValidPromiseID(promiseID)) { return; }

    this.isPolling = true;

    this.timeoutID = window.setTimeout(() => {
      if (this.isValidPromiseID(promiseID)) { this.poll(); }
    }, POLLING_INTERVAL);
  };

  /**
   * Clears the current alert polling timeout function and it's saved ID.
   */
  @action
  private clearPollingTimeout = (): void => {
    if (this.timeoutID) {
      window.clearTimeout(this.timeoutID);

      delete this.timeoutID;

      this.isPolling = false;
    }
  };
}
