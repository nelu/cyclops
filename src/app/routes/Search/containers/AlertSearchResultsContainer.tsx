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
import { SearchAlertResults } from '../components/AlertSearchResults';
import { AlertSearchResultStore } from '~/stores/AlertSearchResultStore';
import { AlertDetail } from '~/services/alerts/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the SearchAlertResult. */
interface Props {
  alertSearchResultStore?: AlertSearchResultStore;
  viewAlert(alert: AlertDetail): any;
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/** Wrapped container component for the SearchAlertResult component. */
export const AlertSearchResultsContainer = inject(
  (stores: RootStore): Partial<Props> => ({
    alertSearchResultStore: stores.alertSearchResultStore,
  }),
)(
  observer((props: Props) => (
    <SearchAlertResults
      page={props.alertSearchResultStore!.page}
      count={props.alertSearchResultStore!.count}
      results={props.alertSearchResultStore!.results}
      viewAlert={props.viewAlert}
      paginate={props.alertSearchResultStore!.paginate}
    />
  )),
);
