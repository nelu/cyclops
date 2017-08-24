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
import { User } from '~/services/users/types';
import * as userAPI from '~/services/users/utils/userAPI';
import { RootStore } from '~/stores';

/** Store containing users of Cyphon. */
export class UserStore {
  @observable public users: User[] = [];
  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  /**
   * Fetches all the current Cyphon users and stores them.
   * @returns {Promise<void>}
   */
  @action
  public fetchAllUsers = (): Promise<void> => {
    return userAPI.fetchAllUsers()
      .then((users) => { this.users = users; })
      .catch((error) => { this.stores.errorStore.addError(error); });
  };
}
