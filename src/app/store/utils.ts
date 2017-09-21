import { ReducerMap, Reducer } from '~/store/types';

export function createReducer<State>(
  initial: State,
  reducers: ReducerMap<State>,
): Reducer<State> {
  return (state = initial, action) => {
    const handler = reducers[action.type];

    return handler ? handler(state, action) : state;
  };
}

export function updateState<State>(
  state: State,
  update: Partial<State>,
): State {
  return Object.assign({}, state, update);
}
