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
import { observable, action, computed } from 'mobx';
import * as _ from 'lodash';

// Local
import { RootStore } from './';
import {
  MonitorNested,
  MonitorsByName
} from '~/services/monitors/types';
import { fetchAllMonitors } from '~/services/monitors/utils/monitorAPI';
import { PromiseID } from '~/utils/PromiseID';
import { Timeout } from '~/utils/Timeout';
import { StoredError } from '~/services/errors/types';

const ACTIVE_STATUS = 'GREEN';
const POLLING_INTERVAL = 60000;

export class MonitorStore {
  @observable public isLoading: boolean = false;
  @observable public isModalActive: boolean = false;
  @observable public monitors: MonitorNested[] = [];

  private selectedMonitorName?: string;
  private stores: RootStore;
  private promiseID: PromiseID = new PromiseID();
  private timeout: Timeout = new Timeout(POLLING_INTERVAL);

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @computed
  public get selectedMonitor(): MonitorNested | undefined {
    return this.selectedMonitorName
      ? this.monitorsByName[this.selectedMonitorName]
      : undefined;
  }

  @computed
  public get monitorsByName(): MonitorsByName {
    return _.keyBy(this.monitors, 'name');
  }

  @computed
  public get monitorsDown(): string[] {
    return this
      .monitors
      .filter((monitor) => monitor.status !== ACTIVE_STATUS)
      .map((monitor) => monitor.name);
  }

  @computed
  public get monitorsUp(): string[] {
    return this
      .monitors
      .filter((monitor) => monitor.status === ACTIVE_STATUS)
      .map((monitor) => monitor.name);
  }

  @computed
  public get monitorsDownCount(): number {
    return this.monitorsDown.length;
  }

  @computed
  public get monitorsUpCount(): number {
    return this.monitorsUp.length;
  }

  @action
  public selectMonitor = (name: string): void => {
    this.selectedMonitorName = name;
  };

  @action
  public fetchMonitors = (): Promise<void> => {
    const promiseID = this.promiseID.reset();

    this.isLoading = true;

    return fetchAllMonitors()
      .then((monitors) => { this.fetchMonitorsSuccess(monitors, promiseID); })
      .catch((error) => { this.fetchMonitorsError(error, promiseID); });
  };

  @action
  private fetchMonitorsSuccess = (
    monitors: MonitorNested[],
    promiseID: PromiseID,
  ): void => {
    if (this.promiseID.matches(promiseID)) {
      this.monitors = monitors;
      this.isLoading = false;
      this.startTimeout(promiseID);
    }
  };

  @action
  private fetchMonitorsError = (
    error: StoredError,
    promiseID: PromiseID,
  ): void => {
    this.stores.errorStore.add(error);

    if (this.promiseID.matches(promiseID)) { this.isLoading = false; }
  };

  @action
  public openModal = (): Promise<void> => {
    this.isModalActive = true;

    return this.fetchMonitors();
  };

  @action
  public closeModal = (): void => {
    this.isModalActive = false;
  };

  @action
  private poll = (): Promise<void> => {
    const promiseID = this.promiseID.reset();

    this.timeout.clear();

    return fetchAllMonitors()
      .then((monitors) => {
        this.pollSuccess(monitors, promiseID);
      })
      .catch(this.storeError);
  };

  @action
  private pollSuccess = (
    monitors: MonitorNested[],
    promiseID: PromiseID,
  ): void => {
    if (this.promiseID.matches(promiseID)) {
      this.monitors = monitors;
      this.startTimeout(promiseID);
    }
  };

  private storeError = (error: StoredError): void => {
    this.stores.errorStore.add(error);
  };

  private startTimeout = (promiseID: PromiseID): void => {
    this.timeout.start(() => {
      if (this.promiseID.matches(promiseID)) { this.poll(); }
    });
  };
}
