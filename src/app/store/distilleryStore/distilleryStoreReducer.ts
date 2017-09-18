// Local
import { createReducer, updateState } from '~/store/utils';
import * as actions from './distilleryStoreActions';
import { NormalizedDistilleryList } from '~/services/distilleries/types';
import { normalizeDistilleries } from '~/services/distilleries/utils/distilleryNormalizr';

export type DistilleryStoreState = NormalizedDistilleryList;

export const distilleryStore = createReducer<DistilleryStoreState>({
  result: [],
  entities: {
    distilleries: {},
    containers: {},
    fields: {},
    contexts: {},
  },
}, {
  [actions.FETCH_DISTILLERIES_SUCCESS]: (
    state: DistilleryStoreState,
    action: actions.FetchDistilleriesSuccessAction,
  ) => updateState(state, normalizeDistilleries(action.payload)),
});