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
import { ThunkActionPromise } from '~/store/types';
import * as actions from './tagStoreActions';
import { fetchAllTags } from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';

/**
 * Fetches the current list of all available tags.
 * @returns {ThunkActionPromise}
 */
export function fetchTags(): ThunkActionPromise {
  return async (dispatch) => {
    dispatch(actions.fetchTagsPending());

    try {
      dispatch(actions.fetchTagsSuccess(await fetchAllTags()));
    } catch (error) {
      dispatch(actions.fetchTagsFailure());
      dispatch(addError(error));
    }
  };
}
