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
import { AlertDetail } from '../components/AlertDetail';
import { AlertDetailStore } from '~/stores/AlertDetailStore';
import { UserStore } from '~/stores/UserStore';
import { RouteProps } from '~/types/router';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertDetail. */
interface Props extends RouteProps<any> {
  alertDetailStore?: AlertDetailStore;
  userStore?: UserStore;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the AlertDetail component. */
export const AlertDetailContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    alertDetailStore: stores.alertDetailStore,
    userStore: stores.userStore,
  }),
)(
  observer((props: Props) => (
    <AlertDetail
      alert={props.alertDetailStore!.alert}
      actions={props.alertDetailStore!.actions}
      users={props.userStore!.users}
      isLoading={props.alertDetailStore!.isLoading}
      markers={props.alertDetailStore!.markers}
      locations={props.alertDetailStore!.locations}
      ipAddresses={props.alertDetailStore!.IPAddresses}
      modalActive={props.alertDetailStore!.isModalActive}
      errors={props.alertDetailStore!.errors}
      location={props.location}
      history={props.history}
      match={props.match}
      addComment={props.alertDetailStore!.addComment}
      onClose={props.alertDetailStore!.closeModal}
      closeErrors={props.alertDetailStore!.clearErrors}
      openModal={props.alertDetailStore!.openModal}
      performAction={props.alertDetailStore!.performAction}
      updateAlert={props.alertDetailStore!.update}
      viewAlert={props.alertDetailStore!.fetchAlert}
    />
  )),
);

