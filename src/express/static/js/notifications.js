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

/**
 * Service worker for Cyphon push notifications. Retrieves the most
 * recent alert information when a notification occurs.
 */

/** Push notification listener */
self.addEventListener('push', function(event) {
  console.log('Received a push notification', event);

  var headers = new Headers({ 'Content-Type': 'application/json' });
  var init = { method: 'GET', headers: headers };
  var url = '/api/notifications/';
  var request = new Request(url, init);

  event.waitUntil(
    // Fetch new alert information.
    fetch(request).then(function(response) {
      console.log("Received notification response", response);

      if (response.status !== 200) {
        throw new Error(
          "Could not retrieve response from " + url +
          " status code: " + response.status
        );
      }

      return response.json().then(function(data) {
        console.log("Parsed response JSON", data);

        if (data.error) {
          throw new Error("Error parsing response json");
        }

        return self.registration.showNotification(data.title, {
          body: data.message,
          tag: data.tag,
        })
      });
    })
  );
});
