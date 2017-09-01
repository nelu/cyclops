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
import { match } from 'react-router';

// Local
import { RootStore } from '~/stores';
import { AlertListStore } from '~/stores/AlertListStore';
import { AlertDetailStore } from '~/stores/AlertDetailStore';
import { UserStore } from '~/stores/UserStore';
import { AlertView } from '../components/AlertView';
import { LocationDescriptorObject, History } from 'history';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertViewContainer. */
interface Props {
  alertListStore?: AlertListStore;
  alertDetailStore?: AlertDetailStore;
  userStore?: UserStore;
  history: History;
  match: match<any>;
  location: LocationDescriptorObject;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Wrapped container component for the AlertView component.
 * @type {React.ClassicComponentClass<Props> & IWrappedComponent<any>}
 */
export const AlertViewContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    alertListStore: stores.alertListStore,
    alertDetailStore: stores.alertDetailStore,
    userStore: stores.userStore,
  }),
)(
  observer((props: Props) => (
    <AlertView
      activeAlertID={props.alertDetailStore!.id}
      alerts={props.alertListStore!.alerts}
      categories={props.alertListStore!.categories}
      count={props.alertListStore!.count}
      distilleries={props.alertListStore!.distilleries}
      isLoading={props.alertListStore!.isLoading}
      isPolling={props.alertListStore!.isPolling}
      location={props.location}
      history={props.history}
      match={props.match}
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
