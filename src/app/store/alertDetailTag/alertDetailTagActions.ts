import { ReduxActionWithType } from '~/store/types';

export const ADD_TAG = 'ALERT_DETAIL_TAG_ADD_TAG';
export type AddTagAction = ReduxActionWithType<
  typeof ADD_TAG,
  { alertID: number, tagID: number }>;
export const addTag = (alertID: number, tagID: number): AddTagAction => ({
  type: ADD_TAG,
  payload: { alertID, tagID },
});

export const ADD_TAG_SUCCESS = 'ALERT_DETAIL_TAG_ADD_TAG_SUCCESS';
export type AddTagSuccessAction = ReduxActionWithType<
  typeof ADD_TAG_SUCCESS,
  { alertID: number, tagID: number }>;
export const addTagSuccess = (alertID: number, tagID: number): AddTagSuccessAction => ({
  type: ADD_TAG_SUCCESS,
  payload: { alertID, tagID },
});

export const ADD_TAG_FAILURE = 'ALERT_DETAIL_TAG_ADD_TAG_FAILURE';
export type AddTagFailureAction = ReduxActionWithType<
  typeof ADD_TAG_FAILURE,
  { alertID: number, tagID: number }>;
export const addTagFailure = (alertID: number, tagID: number): AddTagFailureAction => ({
  type: ADD_TAG_FAILURE,
  payload: { alertID, tagID },
});

export const OPEN_PANEL = 'ALERT_DETAIL_TAG_OPEN_PANEL';
export type OpenPanelAction = ReduxActionWithType<typeof OPEN_PANEL, number>;
export const openPanel = (alertID: number): OpenPanelAction => ({
  type: OPEN_PANEL,
  payload: alertID,
});

export const CANCEL_MODIFICATIONS = 'ALERT_DETAIL_TAG_CANCEL';
export type CancelModificationsAction = ReduxActionWithType<typeof CANCEL_MODIFICATIONS, number>;
export const cancelModifications = (alertID: number): CancelModificationsAction => ({
  type: CANCEL_MODIFICATIONS,
  payload: alertID,
});

export const SHOW_REMOVAL_CONFIRMATION = 'ALERT_DETAIL_TAG_SHOW_REMOVAL_CONFIRMATION';
export type ShowRemovalConfirmationAction = ReduxActionWithType<
  typeof SHOW_REMOVAL_CONFIRMATION,
  { alertID: number, tagID: number }>;
export const showRemovalConfirmation = (
  alertID: number,
  tagID: number,
): ShowRemovalConfirmationAction => ({
  type: SHOW_REMOVAL_CONFIRMATION,
  payload: { alertID, tagID },
});

export const CANCEL_TAG_REMOVAL = 'ALERT_DETAIL_TAG_CANCEL_TAG_REMOVAL';
export type CancelTagRemovalAction = ReduxActionWithType<
  typeof CANCEL_TAG_REMOVAL,
  { alertID: number, tagID: number }>;
export const cancelTagRemoval = (alertID: number, tagID: number): CancelTagRemovalAction => ({
  type: CANCEL_TAG_REMOVAL,
  payload: { alertID, tagID },
});

export const REMOVE_TAG = 'ALERT_DETAIL_TAG_REMOVE_TAG';
export type RemoveTagAction = ReduxActionWithType<
  typeof REMOVE_TAG,
  { alertID: number, tagID: number }>;
export const removeTag = (alertID: number, tagID: number): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: { alertID, tagID },
});

export const REMOVE_TAG_SUCCESS = 'ALERT_DETAIL_TAG_REMOVE_TAG_SUCCESS';
export type RemoveTagSuccessAction = ReduxActionWithType<
  typeof REMOVE_TAG_SUCCESS,
  { alertID: number, tagID: number }>;
export const removeTagSuccess = (alertID: number, tagID: number): RemoveTagSuccessAction => ({
  type: REMOVE_TAG_SUCCESS,
  payload: { alertID, tagID },
});

export const REMOVE_TAG_FAILED = 'ALERT_DETAIL_TAG_REMOVE_TAG_FAILED';
export type RemoveTagFailedAction = ReduxActionWithType<
  typeof REMOVE_TAG_FAILED,
  { alertID: number, tagID: number }>;
export const removeTagFailed = (alertID: number, tagID: number): RemoveTagFailedAction => ({
  type: REMOVE_TAG_FAILED,
  payload: { alertID, tagID },
});
