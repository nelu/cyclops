
import { StoredError } from '~/routes/App/types';
import { ReduxAction } from '~/types/redux';

const ACTION_PREFIX = 'ERRORS';

export const ADD_ERROR = `${ACTION_PREFIX}/ADD_ERROR`;
export type AddErrorAction = ReduxAction<StoredError>;
export function addError(error: StoredError): AddErrorAction {
  return { type: ADD_ERROR, payload: error };
}

export const VIEW_ERROR = `${ACTION_PREFIX}/VIEW_ERROR`;
export type ViewErrorAction = ReduxAction<number>;
export function viewError(index: number): ViewErrorAction {
  return { type: VIEW_ERROR, payload: index };
}

export const CLEAR_ERRORS = `${ACTION_PREFIX}/CLEAR_ERRORS`;
export type ClearErrorsAction = ReduxAction<undefined>;
export function clearErrors(): ClearErrorsAction {
  return { type: CLEAR_ERRORS, payload: undefined };
}
