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
import { MonitorStatus } from '../components/MonitorStatus';
import { MonitorStore } from '~/stores/MonitorStore';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the MonitorStatus. */
interface Props {
  monitorStore?: MonitorStore;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the MonitorStatus component. */
export const MonitorStatusContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    monitorStore: stores.monitorStore,
  }),
)(
  observer((props: Props) => (
    <MonitorStatus
      monitorsUp={props.monitorStore!.monitorsUpCount}
      monitorsDown={props.monitorStore!.monitorsDownCount}
      openModal={props.monitorStore!.openModal}
    />
  )),
);
