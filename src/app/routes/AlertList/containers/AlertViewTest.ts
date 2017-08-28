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
import { inject } from 'mobx-react';

// Local
import { AlertListItem } from '~/services/alerts/types';
import { RootStore } from '~/stores';
import { AlertView, Props } from '~/routes/AlertList/components/AlertView';

// export const AlertViewTest = inject((stores: RootStore): Props => ({
//   alerts: stores.alertListStore.alerts,
//   categories: stores.alertListStore.categories,
//   count: stores.alertListStore.count,
//   distilleries: stores.alertListStore.distilleries,
//   isLoading: stores.alertListStore.isLoading,
//   isPolling: stores.alertListStore.isPolling,
//   selectedAlert: stores.alertDetailStore.id,
//   pollingEnabled: stores.alertListStore.isPollingEnabled,
//   users: stores.userStore.users,
//   search: stores.alertListStore.search,
//   location: {} as any,
//   router: {} as any,
//   startPolling: stores.alertListStore.startPolling,
//   stopPolling: stores.alertListStore.stopPolling,
// }))(AlertView);
