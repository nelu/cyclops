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
import { TagWithTopic } from '~/services/tags/types';
import { ReduxAction, ThunkActionPromise } from '~/store/types';
import { getAll } from '~/services/cyphon/utils/cyphonAPI';
import { addError } from '~/store/errorModal';
import { fetchAllTags } from '~/services/tags/utils/tags.api';

const ACTION_PREFIX = 'TAG_STORE';

// -- FETCH_TAG_LIST_PENDING --
// API call to retrieve current tag list is pending.

export const FETCH_TAG_LIST_PENDING = `${ACTION_PREFIX}/FETCH_TAG_LIST_PENDING`;
export type TagListPendingAction = ReduxAction<undefined>;
export function fetchTagListPending(): TagListPendingAction {
  return { type: FETCH_TAG_LIST_PENDING, payload: undefined };
}

// -- FETCH_TAG_LIST_SUCCESS --
// API call to retrieve current tag list is successful.

export const FETCH_TAG_LIST_SUCCESS = `${ACTION_PREFIX}/FETCH_TAG_LIST_SUCCESS`;
export type TagListSuccessAction = ReduxAction<TagWithTopic[]>;
export function fetchTagListSuccess(tags: TagWithTopic[]): TagListSuccessAction {
  return { type: FETCH_TAG_LIST_SUCCESS, payload: tags };
}

// -- FETCH_TAG_LIST_FAILED --
// API call to retrieve current tag list failed.

export const FETCH_TAG_LIST_FAILED = `${ACTION_PREFIX}/FETCH_TAG_LIST_FAILED`;
export type TagListFailedAction = ReduxAction<undefined>;
export function fetchTagListFailed(): TagListFailedAction {
  return { type: FETCH_TAG_LIST_FAILED, payload: undefined };
}

/**
 *
 * @returns {ThunkActionPromise}
 */
export function fetchTagList(): ThunkActionPromise {
  return (dispatch) => {
    dispatch(fetchTagListPending());

    return fetchAllTags()
      .then((tags) => {
        dispatch(fetchTagListSuccess(tags));
      })
      .catch((error) => {
        dispatch(addError(error));
      });
  };
}
