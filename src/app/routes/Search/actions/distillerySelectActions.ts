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
import * as _ from 'lodash';

// Local
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '~/types/redux';
import { NormalizedDistilleryList } from '~/services/distilleries/types';
import { getSharedDistilleryFields } from '~/services/distilleries/utils/distilleryNormalizr';

/**
 * Action type prefix for distillery select actions.
 * @type {string}
 */
const ACTION_PREFIX = 'SEARCH_DISTILLERY_SELECT';

// --------------------------------------------------------------------------
// SELECT_DISTILLERY
// --------------------------------------------------------------------------

/**
 * Redux Action Type: When a distillery to search has been selected.
 * @type {string}
 */
export const SELECT_DISTILLERY = `${ACTION_PREFIX}/SELECT_DISTILLERY`;

/** SELECT_DISTILLERY payload type. */
export type SelectDistilleryPayload = {
  selected: number[];
  fields: string[];
};

/** SELECT_DISTILLERY action type. */
export type SelectDistilleryAction = ReduxAction<SelectDistilleryPayload>;

/**
 * Creates a(n) SELECT_DISTILLERY action.
 * @returns {SelectDistilleryAction}
 */
// export function selectDistillery(
//   normalized: NormalizedDistilleryList,
//   selected: number[],
//   distillery: number,
// ): SelectDistilleryAction {
//   const selections: number[] = _.xor(selected, [distillery]);
//   const fields = getSharedDistilleryFields(normalized, selections);
//
//   return {
//     type: SELECT_DISTILLERY,
//     payload: {
//       selected: selections,
//       fields,
//     },
//   };
// }
