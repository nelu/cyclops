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

// // Local
// import { CONFIG } from '../config';
// import * as api from '../api/api';
//
// /**
//  * Activates chrome push notifications.
//  */
// export function activateNotifications(): void {
//   requestNotificationPermission();
//
//   if (serviceWorkersAreSupported()) {
//     registerServiceWorker()
//       .then(() => {
//         if (!notificationsAreSupported()) return;
//
//         getServiceWorkerRegistration()
//           .then(getRegistrationSubscription)
//           .then((subscription) => {
//             if (subscription) sendSubscriptionToServer(subscription);
//           });
//       });
//   }
// }
//
// export function subscribeToNotifications(): void {
//   getServiceWorkerRegistration()
//     .then(subscribeToPushManager)
//     .then(sendSubscriptionToServer);
// }
//
// /**
//  * Registers the notification service worker with this application.
//  * @returns {Promise<ServiceWorkerRegistration>}
//  */
// function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
//   return navigator
//     .serviceWorker
//     .register(CONFIG.NOTIFICATIONS_SERVICE_WORKER_URL);
// }
//
// function requestNotificationPermission(): void {
//   console.log('yup');
//   if (Notification) {
//     console.log('mhmm');
//     Notification.requestPermission();
//   }
// }
//
// /**
//  * Subscribes the user to push notifications.
//  * @param registration
//  * @returns {Promise<PushSubscription>}
//  */
// function subscribeToPushManager(
//   registration: ServiceWorkerRegistration,
// ): Promise<PushSubscription> {
//   return registration.pushManager.subscribe({ userVisibleOnly: true });
// }
//
// /**
//  * Gets the registration id of the push messaging subscription.
//  * @param subscription
//  * @returns {string}
//  */
// function getRegistrationId(subscription: PushSubscription): string {
//   const urlSplit = subscription.endpoint.split('/');
//
//   return urlSplit[urlSplit.length - 1];
// }
//
// /**
//  * Sends the subscription information to the Cyphon server.
//  * @param subscription
//  * @returns {Promise<any>}
//  */
// function sendSubscriptionToServer(subscription: PushSubscription) {
//   return api.post(
//     '/notifications/subscribe/',
//     { registration_id: getRegistrationId(subscription) },
//   );
// }
//
// /**
//  * Checks if service workers are supported.
//  * @returns {boolean} If service workers are supported.
//  */
// function serviceWorkersAreSupported(): boolean {
//   return 'serviceWorker' in navigator;
// }
//
// /**
//  * Checks if push messaging is supported.
//  * @returns {boolean} If push messaging is supported.
//  */
// function pushMessagingIsSupported(): boolean {
//   return 'PushManager' in window;
// }
//
// /**
//  * Checks if notifications are supported.
//  * @returns {boolean}
//  */
// function notificationsAreSupported(): boolean {
//   return !('showNotification' in ServiceWorkerRegistration.prototype);
// }
//
// /**
//  * Gets the registration object associated with a service worker.
//  * @returns {Promise<ServiceWorkerRegistration>}
//  */
// function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
//   return navigator.serviceWorker.ready;
// }
//
// function notificationsAreDenied(): boolean {
//   return Notification.permission === 'denied';
// }
//
// /**
//  * Gets the push notification subscription from a service worker
//  * registration.
//  * @param registration Service worker registration.
//  * @returns {Promise<PushSubscription>} Push notification subscription.
//  */
// function getRegistrationSubscription(
//   registration: ServiceWorkerRegistration,
// ): Promise<PushSubscription> {
//   return registration.pushManager.getSubscription();
// }