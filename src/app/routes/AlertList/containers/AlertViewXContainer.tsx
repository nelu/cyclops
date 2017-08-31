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
import * as React from 'react';
import { inject, observer } from 'mobx-react';

// Local
import { RootStore } from '~/stores';
import { AlertListStore } from '~/stores/AlertListStore';
import { AlertDetailStore } from '~/stores/AlertDetailStore';
import { UserStore } from '~/stores/UserStore';
import {
  InjectedRouter,
  LocationDescriptor,
} from 'react-router';
import { AlertViewX } from '../components/AlertViewX';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertViewXContainer. */
interface Props {
  alertListStore?: AlertListStore;
  alertDetailStore?: AlertDetailStore;
  userStore?: UserStore;
  router: InjectedRouter;
  location: LocationDescriptor;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Wrapped container component for the AlertViewX component.
 * @type {React.ClassicComponentClass<Props> & IWrappedComponent<any>}
 */
export const AlertViewXContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    alertListStore: stores.alertListStore,
    alertDetailStore: stores.alertDetailStore,
    userStore: stores.userStore,
  }),
)(
  observer((props: Props) => (
    <AlertViewX
      activeAlertID={props.alertDetailStore!.id}
      alerts={props.alertListStore!.alerts}
      categories={props.alertListStore!.categories}
      count={props.alertListStore!.count}
      distilleries={props.alertListStore!.distilleries}
      isLoading={props.alertListStore!.isLoading}
      isPolling={props.alertListStore!.isPolling}
      location={props.location}
      router={props.router}
      users={props.userStore!.users}
      fetchCategories={props.alertListStore!.fetchCategories}
      fetchDistilleries={props.alertListStore!.fetchDistilleries}
      fetchUsers={props.userStore!.fetchUsers}
      search={props.alertListStore!.search}
      startPolling={props.alertListStore!.startPolling}
      stopPolling={props.alertListStore!.stopPolling}
    />
  )),
);
