import * as actions from './alertDetailTagActions';
import {
  addTagRelation, deleteTagRelation,
  findTagRelation,
} from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';
import { ThunkActionPromise } from '~/store/types';

export function addTag(alertID: number, tagID: number, userID: number): ThunkActionPromise {
  return (dispatch) => {
    dispatch(actions.addTag(alertID, tagID, userID));

    return addTagRelation('alert', alertID, tagID, userID)
      .then(() => {
        dispatch(actions.addTagSuccess(alertID, tagID, userID));
      })
      .catch((error) => {
        dispatch(actions.addTagFailure(alertID, tagID, userID));
        dispatch(addError(error));
      });
  };
}

export function removeTag(alertID: number, tagID: number): ThunkActionPromise {
  return (dispatch) => {
    dispatch(actions.removeTag(alertID, tagID));

    return findTagRelation('alert', alertID, tagID)
      .then((relation) => {
        return deleteTagRelation(relation.id);
      })
      .then(() => {
        dispatch(actions.removeTagSuccess(alertID, tagID));
      })
      .catch((error) => {
        dispatch(actions.removeTagFailed(alertID, tagID));
        dispatch(addError(error));
      });
  };
}
