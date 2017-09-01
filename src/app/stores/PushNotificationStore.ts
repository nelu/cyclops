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
import { action, observable } from 'mobx';

// Local
import { getConfig } from '~/config';
import { RootStore } from '~/stores';
import { post } from '~/services/cyphon/utils/cyphonAPI';

export class PushNotificationStore {
  public static NOTIFICATIONS_ARE_SUPPORTED = ServiceWorkerRegistration
    ? ('showNotification' in ServiceWorkerRegistration.prototype)
    : false;
  public static PUSH_MESSAGING_IS_SUPPORTED = ('PushManager' in window);
  public static SERVICE_WORKERS_ARE_SUPPORTED = navigator
    ? ('serviceWorker' in navigator)
    : false;
  public static SERVICE_WORKERS_UNSUPPORTED_MESSAGE = (
    'Service workers are not supported in this browser.'
  );
  public static NOTIFICATIONS_ARE_UNSUPPORTED_MESSAGE = (
    'Notifications are not supported in this browser.'
  );
  public static NOTIFICATIONS_ARE_DENIED_MESSAGE = (
    'Notifications have been blocked.'
  );
  public static PUSH_MESSAGING_IS_UNSUPPORTED_MESSAGE = (
    'Push messaging is not supported in this browser.'
  );
  public static MISSING_SUBSCRIPTION_MESSAGE = (
    'Push subscription is missing.'
  );

  /**
   * Attempts to register the service worker file.
   * @returns {Promise<ServiceWorkerRegistration>}
   */
  public static registerServiceWorker() {
    return navigator
      .serviceWorker
      .register(getConfig().NOTIFICATIONS_SERVICE_WORKER_URL);
  }

  /**
   * Determines if the user has blocked notifications.
   * @returns {boolean}
   */
  public static areNotificationsDenied() {
    return (Notification as any).permission === 'denied';
  }

  /**
   * Gets the service worker registration.
   * @returns {Promise<any>}
   */
  public static getServiceWorkerRegistration(): Promise<any> {
    return navigator.serviceWorker.ready;
  }

  /**
   * Attempts to subscribe a registered service worker to the push manager.
   * @param registration
   * @returns {Promise<any>}
   */
  public static subscribeToPushManager(registration: any): Promise<any> {
    return registration.pushManager.subscribe({ userVisibleOnly: true });
  }

  /**
   * Gets the registration ID from a PushSubscription.
   * @param {PushSubscription} subscription
   * @returns {string}
   */
  public static getRegistrationId(subscription: PushSubscription): string {
    const urlSplit = subscription.endpoint.split('/');

    return urlSplit[urlSplit.length - 1];
  }

  /**
   * Attempts to send the subscription registration ID to the Cyphon server.
   * @param {PushSubscription} subscription
   * @returns {Promise<any>}
   */
  public static sendSubscriptionToServer(
    subscription: PushSubscription,
  ): Promise<any> {
    return post('/notifications/subscribe/', {
      registration_id: PushNotificationStore.getRegistrationId(subscription),
    });
  }

  /**
   * Attempts to set the variables needed for the service worker to
   * function.
   * @param {PushSubscription} subscription
   */
  public static setWorkerVariables(subscription: PushSubscription) {
    const registrationId = PushNotificationStore.getRegistrationId(subscription);

    navigator.serviceWorker.controller!.postMessage({
      notificationUrl:
      `${getConfig().API_URL}/notifications/` +
      `?registration_id=${registrationId}`,
    });
  }

  @observable public isActive: boolean = false;
  @observable public errors: string[] = [];

  private stores: RootStore;

  constructor(stores: RootStore) {
    this.stores = stores;

    this.setupNotifications();
  }

  /**
   * Attempts to setup push notifications for the application.
   * @returns {Promise<void>}
   */
  @action
  public setupNotifications = (): Promise<void> => {
    return this.checkIfServiceWorkersAreSupported()
      .then(() => PushNotificationStore.registerServiceWorker())
      .then(() => Promise.all([
        this.checkIfPushMessagingIsSupported(),
        this.checkIfNotificationsAreSupported(),
      ]))
      .then(() => this.checkIfNotificationsAreDenied())
      .then(() => PushNotificationStore.getServiceWorkerRegistration())
      .then((registration) => (
        PushNotificationStore.subscribeToPushManager(registration)
      ))
      .then((subscription) => this.checkIfSubscriptionExists(subscription))
      .then((subscription) => (
        PushNotificationStore
          .sendSubscriptionToServer(subscription)
          .catch(this.stores.errorStore.add)
          .then(() => subscription)
      ))
      .then((subscription) => {
        PushNotificationStore.setWorkerVariables(subscription);

        this.isActive = true;
      });
  };

  /**
   * Checks if notifications are supported. If not, it adds an error
   * message explaining the problem.
   * @returns {Promise<void>}
   */
  private checkIfNotificationsAreSupported = (): Promise<void> => {
    if (!PushNotificationStore.NOTIFICATIONS_ARE_SUPPORTED) {
      this.errors.push(PushNotificationStore.NOTIFICATIONS_ARE_UNSUPPORTED_MESSAGE);

      return Promise.reject(
        PushNotificationStore.NOTIFICATIONS_ARE_UNSUPPORTED_MESSAGE,
      );
    }

    return Promise.resolve();
  };

  /**
   * Checks if notifications are denied by the user. If so, adds an
   * error message explaining the problem.
   * @returns {Promise<void>}
   */
  private checkIfNotificationsAreDenied = (): Promise<void> => {
    if (PushNotificationStore.areNotificationsDenied()) {
      this.errors.push(PushNotificationStore.NOTIFICATIONS_ARE_DENIED_MESSAGE);

      return Promise.reject(
        PushNotificationStore.NOTIFICATIONS_ARE_DENIED_MESSAGE,
      );
    }

    return Promise.resolve();
  };

  /**
   * Checks if service workers are supported. If not, adds an error
   * message explaining the problem.
   * @returns {Promise<void>}
   */
  private checkIfServiceWorkersAreSupported = (): Promise<void> => {
    if (!PushNotificationStore.SERVICE_WORKERS_ARE_SUPPORTED) {
      this.errors.push(PushNotificationStore.SERVICE_WORKERS_UNSUPPORTED_MESSAGE);

      return Promise.reject(
        PushNotificationStore.SERVICE_WORKERS_UNSUPPORTED_MESSAGE,
      );
    }

    return Promise.resolve();
  };

  /**
   * Checks if push messaging is supported. If not, adds an error message
   * explaining the problem.
   * @returns {Promise<void>}
   */
  private checkIfPushMessagingIsSupported = (): Promise<void> => {
    if (!PushNotificationStore.PUSH_MESSAGING_IS_SUPPORTED) {
      this.errors.push(PushNotificationStore.PUSH_MESSAGING_IS_UNSUPPORTED_MESSAGE);

      return Promise.reject(
        PushNotificationStore.PUSH_MESSAGING_IS_UNSUPPORTED_MESSAGE,
      );
    }

    return Promise.resolve();
  };

  /**
   * Checks if a push subscription exists. If not, adds an error message
   * explaining the problem.
   * @param {PushSubscription} subscription
   * @returns {Promise<PushSubscription>}
   */
  private checkIfSubscriptionExists = (
    subscription?: PushSubscription,
  ): Promise<PushSubscription> => {
    if (!subscription) {
      this.errors.push(PushNotificationStore.MISSING_SUBSCRIPTION_MESSAGE);

      return Promise.reject(
        PushNotificationStore.MISSING_SUBSCRIPTION_MESSAGE,
      );
    }

    return Promise.resolve(subscription);
  };
}
