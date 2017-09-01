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
import { RootStore } from '~/stores';
import { fetchAllDistilleries } from '~/services/distilleries/utils/distilleryAPI';
import { DistilleryNested } from '~/services/distilleries/types';
import { ContainerNested } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';
import { Dictionary } from '~/types/object';
import { StoredError } from '~/services/errors/types';

export class DistilleryStore {
  @observable public distilleries: DistilleryNested[] = [];

  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @computed get fields(): Field[] {
    const fields = this.containers.map((container) => container.fields);

    return _.unionBy(_.flatten(fields), 'field_name');
  }

  @computed get containers(): ContainerNested[] {
    const containers = this.distilleries.map(
      (distillery) => distillery.container,
    );

    return _.uniqBy(containers, 'id');
  }

  @computed get containersByID(): Dictionary<ContainerNested> {
    return _.keyBy(this.containers, 'id');
  }

  @computed
  public get fieldsByName(): Dictionary<Field> {
    return _.keyBy(this.fields, 'field_name');
  }

  @computed
  public get distilleriesByID(): Dictionary<DistilleryNested> {
    return _.keyBy(this.distilleries, 'id');
  }

  @action
  public fetchDistilleries = (): Promise<void> => {
    return fetchAllDistilleries()
      .then(this.setDistilleries)
      .catch(this.storeError);
  };

  @action
  private setDistilleries = (distilleries: DistilleryNested[]): void => {
    this.distilleries = distilleries;
  };

  private storeError = (error: StoredError): void => {
    this.stores.errorStore.add(error);
  };
}
