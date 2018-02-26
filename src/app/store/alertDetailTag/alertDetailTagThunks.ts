import * as actions from './alertDetailTagActions';
import { addTagRelation } from '~/services/tags/services/tagAPI';
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
        dispatch(addError(error));
        dispatch(actions.addTagFailure(alertID, tagID, userID));
      });
  };
}
