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
import { RootStore } from '~/stores';
import * as notifications from '~/services/notifications/utils/notifications';

export class PushNotificationStore {
  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;
  }

  @action
  public setupPushNotifications = (): Promise<void> => {
    if (!notifications.serviceWorkersAreSupported()) {
      return Promise.resolve();
    }

    return notifications.registerServiceWorker().then(() => {
      if (
        !notifications.notificationsAreSupported() ||
        !notifications.notificationsAreDenied() ||
        !notifications.pushMessagingIsSupported()
      ) { return Promise.resolve(); }

      return notifications.getServiceWorkerRegistration()
        .then(notifications.subscribeToPushManager)
        .then((subscription) => {
          if (!subscription) { return Promise.resolve(); }

          notifications.sendSubscriptionToServer(subscription)
            .then(() => {
              notifications.setWorkerVariables(subscription);
            })
            .catch((error) => {
              this.stores.errorStore.add(error);
            });
        });
    });
  };
}
