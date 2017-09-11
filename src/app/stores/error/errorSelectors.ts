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
import {
  createSelector,
  OutputSelector
} from 'reselect';
import { RootState } from '~/stores';
import { StoredError } from '~/routes/App/types';

/**
 *
 * @param {RootState} state
 * @returns {StoredError[]}
 */
const getErrors = (state: RootState): StoredError[] => state.error.list;
const getVisibleErrorIndex = (state: RootState): number => (
  state.error.visibleErrorIndex
);

/**
 * Returns the current visible stored error.
 * @type {OutputSelector<any, any, (res: any) => any>}
 */
export const getVisibleError = createSelector(
  [getErrors, getVisibleErrorIndex],
  (errors, visibleErrorIndex) => errors[visibleErrorIndex],
);
