import * as actions from './alertDetailTagActions';
import {
  addTagRelation, deleteTagRelation,
  findTagRelation,
} from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';
import { ThunkActionPromise } from '~/store/types';

/**
 * Adds a tag to an alert.
 * @param {number} alertId Id of the alert to add the tag to.
 * @param {number} tagId Id of the tag to add.
 * @param {number} userId Id of the user adding the tag.
 * @returns {ThunkActionPromise}
 */
export function addTag(alertId: number, tagId: number, userId: number): ThunkActionPromise {
  return async (dispatch) => {
    dispatch(actions.addTag(alertId, tagId, userId));

    try {
      await addTagRelation('alert', alertId, tagId, userId);

      dispatch(actions.addTagSuccess());
    } catch (error) {
      dispatch(actions.addTagFailure());
      dispatch(addError(error));
    }
  };
}

/**
 * Removes a tag from an alert.
 * @param {number} alertId Id of the alert to remove the tag from.
 * @param {number} tagId Id of the tag to remove.
 * @returns {ThunkActionPromise}
 */
export function removeTag(alertId: number, tagId: number): ThunkActionPromise {
  return async (dispatch) => {
    dispatch(actions.removeTag(alertId, tagId));

    try {
      const relation = await findTagRelation('alert', alertId, tagId);
      await deleteTagRelation(relation.id);

      dispatch(actions.removeTagSuccess());
    } catch (error) {
      dispatch(actions.removeTagFailed());
      dispatch(addError(error));
    }
  };
}
