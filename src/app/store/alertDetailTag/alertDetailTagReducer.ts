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
import * as actions from './alertDetailTagActions';
import * as tagStoreActions from '~/store/tagStore/tagStoreActions';

export interface AlertDetailTagState {
  // If the modification panel for tags is currently active.
  panelIsActive: boolean;
  // If a confirmation to remove a tag is currently active.
  confirmationIsActive: boolean;
  // If the current tag list is being fetched.
  isFetchingTags: boolean;
}

export const INITIAL_STATE: AlertDetailTagState = {
  panelIsActive: false,
  confirmationIsActive: false,
  isFetchingTags: false,
};

type Actions =
  actions.OpenTagPanelAction |
  actions.CloseTagePanelAction |
  actions.ShowRemovalConfirmationAction |
  actions.CancelTagRemovalAction |
  tagStoreActions.FetchTagsPendingAction |
  tagStoreActions.FetchTagsSuccessAction |
  tagStoreActions.FetchTagsFailureAction;

export function alertDetailTagReducer(
  state: AlertDetailTagState = INITIAL_STATE,
  action: Actions,
): AlertDetailTagState {
  switch (action.type) {
    case actions.OPEN_TAG_PANEL:
      return { ...state, panelIsActive: true };

    case actions.CLOSE_TAG_PANEL:
      return { ...state, panelIsActive: false };

    case actions.SHOW_REMOVAL_CONFIRMATION:
      return { ...state, confirmationIsActive: true };

    case actions.CANCEL_TAG_REMOVAL:
      return { ...state, confirmationIsActive: false };

    case tagStoreActions.FETCH_TAGS_PENDING:
      return { ...state, isFetchingTags: true };

    case tagStoreActions.FETCH_TAGS_FAILURE:
      return { ...state, isFetchingTags: false, panelIsActive: false };

    case tagStoreActions.FETCH_TAGS_SUCCESS:
      return { ...state, isFetchingTags: false };

    default:
      return state;
  }
}