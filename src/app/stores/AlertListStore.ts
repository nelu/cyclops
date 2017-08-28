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
  Category,
} from '~/services/alerts/types';
import {
  fetchAlertList,
  fetchAllCategories
} from '~/services/alerts/utils/alertsAPI';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { fetchAllAlertDistilleries } from '~/services/distilleries/utils/distilleryAPI';
import { RootStore } from '~/stores';
import { PromiseID } from '~/utils/PromiseID';
import { Timeout } from '~/utils/Timeout';

/**
 * Interval to poll for alerts.
 * @type {number}
 */
const POLLING_INTERVAL = 5000;

export class AlertListStore {
  @observable public alerts: AlertListItem[] = [];
  @observable public categories: Category[] = [];
  @observable public count: number = 0;
  @observable public distilleries: DistilleryMinimal[] = [];
  @observable public isLoading: boolean = false;
  @observable public isPolling: boolean = true;

  private isPollingEnabled: boolean = true;
  private params: AlertSearchParams = {};
  private promiseID: PromiseID = new PromiseID();
  private stores: RootStore;
  private timeout: Timeout = new Timeout(POLLING_INTERVAL);

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
    const promiseID = this.promiseID.reset();

    this.timeout.clear();
    this.isPolling = false;
    this.isLoading = true;
    this.params = params;

    return fetchAlertList(params)
      .then((response) => {
        if (this.promiseID.matches(promiseID)) {
          this.alerts = response.results;
          this.count = response.count;
          this.isLoading = false;

          if (this.isPollingEnabled) { this.startTimeout(promiseID); }
        }
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
        this.isLoading = false;
      });
  };

  /**
   * Fetches distilleries that have alerts created from their distilled stores.
   * @returns {Promise<void>}
   */
  @action
  public fetchDistilleries = (): Promise<void> => {
    return fetchAllAlertDistilleries()
      .then((distilleries) => {
        this.distilleries = distilleries;
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
      });
  };

  @action
  public fetchCategories = (): Promise<void> => {
    return fetchAllCategories()
      .then((categories) => {
        this.categories = categories;
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
      });
  };

  @action
  public startPolling = (): void => {
    this.isPollingEnabled = true;
    this.poll();
  };

  @action
  public stopPolling = (): void => {
    this.isPollingEnabled = false;
    this.promiseID.reset();
    this.timeout.clear();
  };

  private raisePollingNotEnabled = (): Promise<void> => {
    return Promise.reject('Polling is not enabled.');
  };

  /**
   * Polls for alerts based on the stored search parameters from a
   * previous search.
   * @returns {Promise<void>}
   */
  @action
  private poll = (): Promise<void> => {
    if (!this.isPollingEnabled) { return this.raisePollingNotEnabled(); }

    const promiseID = this.promiseID.reset();

    this.timeout.clear();

    return fetchAlertList(this.params)
      .then((response) => {
        if (this.promiseID.matches(promiseID)) {
          this.alerts = response.results;
          this.count = response.count;
          this.startTimeout(promiseID);
        }
      })
      .catch((error) => {
        this.stores.errorStore.add(error);
      });
  };

  /**
   * Sets a timeout function that polls for alerts and saves it's ID.
   * @param {symbol} promiseID ID of the promise that made the initial search.
   */
  @action
  private startTimeout = (promiseID: PromiseID): void => {
    this.isPolling = true;

    this.timeout.start(() => {
      if (this.promiseID.matches(promiseID)) { return this.poll(); }
    });
  };
}
