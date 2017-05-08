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

// Local
import { createAction } from '../../../utils/createReduxAction';
import {
  ReduxAction,
  ThunkActionPromise,
  ThunkActionVoid,
} from '../../../types/redux';
import {
  Alert,
  AlertOutcomeChoices,
} from '../../../api/alerts/types';
import { updateAlertDetail } from './AlertDetailActions';

/**
 * Action type prefix for AlertDetailOutcome actions.
 * @type {string}
 */
const ACTION_PREFIX = 'ALERT_DETAIL_OUTCOME';

// --------------------------------------------------------------------------
// OPEN
// --------------------------------------------------------------------------

/**
 * Action Type: When the user wants to open the form allowing them to change
 * @type {string}
 */
export const OPEN = `${ACTION_PREFIX}/OPEN`;

/**
 * OPEN payload type.
 */
export type OpenPayload = {
  outcome: AlertOutcomeChoices;
  notes: string;
};

/**
 * OPEN action type.
 */
export type OpenAction = ReduxAction<OpenPayload>;

/**
 * Creates a OPEN action.
 * @returns {OpenAction}
 */
export function open(outcome: AlertOutcomeChoices, notes: string): OpenAction {
  return createAction(OPEN, { outcome, notes });
}

// --------------------------------------------------------------------------
// CLOSE
// --------------------------------------------------------------------------

/**
 * Action Type: When the user wants to close the form that allows them to
 * @type {string}
 */
export const CLOSE = `${ACTION_PREFIX}/CLOSE`;

/**
 * CLOSE payload type.
 */
export type ClosePayload = undefined;

/**
 * CLOSE action type.
 */
export type CloseAction = ReduxAction<ClosePayload>;

/**
 * Creates a CLOSE action.
 * @returns {CloseAction}
 */
export function close(): CloseAction {
  return createAction(CLOSE, undefined);
}

// --------------------------------------------------------------------------
// CHANGE_OUTCOME
// --------------------------------------------------------------------------

/**
 * Action Type: When the user changes the outcome they want to change the
 * current alert to.
 * @type {string}
 */
export const CHANGE_OUTCOME = `${ACTION_PREFIX}/CHANGE_OUTCOME`;

/**
 * CHANGE_OUTCOME payload type.
 */
export type ChangeOutcomePayload = AlertOutcomeChoices;

/**
 * CHANGE_OUTCOME action type.
 */
export type ChangeOutcomeAction = ReduxAction<ChangeOutcomePayload>;

/**
 * Creates a CHANGE_OUTCOME action.
 * @returns {ChangeOutcomeAction}
 */
export function changeOutcome(
  outcome: AlertOutcomeChoices,
): ChangeOutcomeAction {
  return createAction(CHANGE_OUTCOME, outcome);
}

// --------------------------------------------------------------------------
// CHANGE_NOTES
// --------------------------------------------------------------------------

/**
 * Action Type: When the user changes the notes for the current alert.
 * @type {string}
 */
export const CHANGE_NOTES = `${ACTION_PREFIX}/CHANGE_NOTES`;

/**
 * CHANGE_NOTES payload type.
 */
export type ChangeNotesPayload = string;

/**
 * CHANGE_NOTES action type.
 */
export type ChangeNotesAction = ReduxAction<ChangeNotesPayload>;

/**
 * Creates a CHANGE_NOTES action.
 * @returns {ChangeNotesAction}
 */
export function changeNotes(notes: string): ChangeNotesAction {
  return createAction(CHANGE_NOTES, notes);
}

// --------------------------------------------------------------------------
// Thunk Actions
// --------------------------------------------------------------------------

/**
 * Submits an update to the alert detail's outcome and notes.
 * @param alert Alert to update.
 * @param outcome Outcome to change to.
 * @param notes Notes to change to.
 * @returns {ThunkActionPromise}
 */
export function submit(
  alert: Alert,
  outcome: AlertOutcomeChoices,
  notes: string,
): ThunkActionPromise {
  return (dispatch) => {
    return dispatch(updateAlertDetail(alert, { outcome, notes })).then(() => {
      dispatch(close());
    });
  };
}

/**
 * Removes the current alert outcome.
 * @returns {ThunkActionPromise}
 */
export function removeOutcome(alert: Alert): ThunkActionPromise {
  return (dispatch) => {
    return dispatch(updateAlertDetail(alert, { outcome: null }));
  };
}
