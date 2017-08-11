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
  Reducer,
  ReducerMap,
  handleActions,
} from 'redux-actions';

// Local
import * as actions from '../actions/searchRouteResourcesActions';
import {
  DistilleryFlat,
  NormalizedDistilleryList,
} from '~/services/distilleries/types';
import { getEntities } from '~/utils/normalizrUtils';
import { Result } from '~/types/result';
import { ContainerFlat } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';

/** SearchQueryState shape of the search route resources reducer. */
export type SearchRouteResourcesState = {
  normalized: NormalizedDistilleryList;
  distilleries: DistilleryFlat[];
  containers: ContainerFlat[];
  fields: Field[];
  results: Result[];
};

/**
 * Initial state of the search route resources reducer.
 * @type {State}
 */
const INITIAL_STATE: SearchRouteResourcesState = {
  normalized: {
    result: [],
    entities: {},
  },
  distilleries: [],
  containers: [],
  fields: [],
  results: [],
};

/**
 * Reducer map for the search route resources reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<SearchRouteResourcesState, any> = {};

/**
 * Updates the search route resources reducer based on a(n)
 * FETCH_DISTILLERIES_SUCCESS action.
 * @param state Current distilleryStoreReducer state.
 * @param action FETCH_DISTILLERIES_SUCCESS action.
 * @returns {State} Updated distilleryStoreReducer state.
 */
reducers[actions.FETCH_DISTILLERIES_SUCCESS] = (
  state: SearchRouteResourcesState,
  action: actions.FetchDistilleriesSuccessAction,
): SearchRouteResourcesState => {
  const distilleries = getEntities<DistilleryFlat>(
    action.payload.entities,
    'distilleries',
  );
  const containers = getEntities<ContainerFlat>(
    action.payload.entities,
    'containers',
  );
  const fields = getEntities<Field>(action.payload.entities, 'fields');
  const update: Partial<SearchRouteResourcesState> = {
    normalized: action.payload,
    distilleries,
    containers,
    fields,
  };

  return Object.assign({}, state, update);
};

/**
 * Search route resources reducer.
 * @type {@type {Reducer<SearchQueryState, any>}
 */
export const searchRouteResourcesReducer = handleActions<
  SearchRouteResourcesState,
  any
>(reducers, INITIAL_STATE);
