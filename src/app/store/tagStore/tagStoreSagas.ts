import { SagaIterator } from 'redux-saga';
import { put, takeEvery, call, all } from 'redux-saga/effects';

// Local
import { OPEN_TAG_PANEL } from '~/store/alertDetailTag/alertDetailTagActions';
import * as actions from './tagStoreActions';
import { fetchAllTags } from '~/services/tags/services/tagAPI';
import { addError } from '~/store/errorModal';

export function * fetchTagList(): SagaIterator {
  yield put(actions.fetchTagsPending());

  try {
    const tags = yield call(fetchAllTags);
    yield put(actions.fetchTagsSuccess(tags));
  } catch (error) {
    yield put(actions.fetchTagsFailure());
    yield put(addError(error));
  }
}

export function * tagStoreSagas(): SagaIterator {
  yield all([
    takeEvery(OPEN_TAG_PANEL, fetchTagList),
  ]);
}
