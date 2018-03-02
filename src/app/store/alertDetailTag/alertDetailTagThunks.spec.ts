// Vendor
import * as sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';

// Local
import * as thunks from './alertDetailTagThunks';
import * as actions from './alertDetailTagActions';
import * as api from '~/services/tags/services/tagAPI';
import { cyphonAPI } from '~/services/cyphon/constants';
import { ADD_ERROR, addError } from '~/store/errorModal';
import { ThunkActionPromise } from '~/store/types';

describe('alertDetailTagSagas()', () => {
  let mockAPI: MockAdapter;
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonSpy;

  beforeAll(() => {
    mockAPI = new MockAdapter(cyphonAPI);
  });

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = sinon.spy();
  });

  afterEach(() => {
    mockAPI.reset();
    dispatch.reset();
    getState.reset();
  });

  afterAll(() => {
    mockAPI.restore();
  });

  describe('addTagSaga()', () => {
    const alertId = 1;
    const tagId = 4;
    const userId = 3;
    const url = /\/tagrelations\/$/;

    it('should make a post request to make a tag relation', async () => {
      const body = {
        content_type: 'alert',
        object_id: alertId,
        tag: tagId,
        tagged_by: userId,
      };
      const thunk = thunks.addTag(alertId, tagId, userId);

      mockAPI.onPost(/\/tagrelations\//, body).reply(200);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagSuccess()]);
    });

    it('should dispatch an ADD_TAG action', async () => {
      const thunk = thunks.addTag(alertId, tagId, userId);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[0]).toEqual([actions.addTag(alertId, tagId, userId)]);
    });

    it('should dispatch an ADD_TAG_SUCCESS action on a successful request', async () => {
      const thunk = thunks.addTag(alertId, tagId, userId);

      mockAPI.onPost(url).reply(200);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagSuccess()]);
    });

    it('should dispatch an ADD_TAG_FAILURE and ADD_ERROR action on an ' +
      'unsuccessful request', async () => {
      const thunk = thunks.addTag(alertId, tagId, userId);

      mockAPI.onPost(url).reply(400);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagFailure()]);
      expect(dispatch.args[2][0].type).toEqual(ADD_ERROR);
      expect(dispatch.args[2][0].payload).toEqual(
        Error('Request failed with status code 400'),
      );
    });
  });

  describe('removeTag()', () => {
    const alertId = 1;
    const tagId = 4;
    let thunk: ThunkActionPromise;
    let call: () => Promise<void>;

    beforeEach(() => {
      thunk = thunks.removeTag(alertId, tagId);
      call = () => thunk(dispatch, getState, undefined);
    });

    it('should dispatch a REMOVE_TAG action', async () => {
      await call();

      expect(dispatch.args[0]).toEqual([actions.removeTag(alertId, tagId)]);
    });

    it('should make consecutive API calls to find the tag relation and delete it', async () => {
      const params = {
        content_type: 'alert',
        object_id: alertId,
        tag: tagId,
      };

      mockAPI.onGet('/tagrelations/', { params }).reply(200, {
        count: 1,
        results: [{ id: 5 }],
      });
      mockAPI.onDelete('/tagrelations/5/').reply(200);

      await call();

      expect(dispatch.args[1][0].type).toEqual(actions.REMOVE_TAG_SUCCESS);
    });

    it('should dispatch a REMOVE_TAG_SUCCESS action on completion', async () => {
      mockAPI.onGet('/tagrelations/').reply(200, {
        count: 1,
        results: [{ id: 5 }],
      });
      mockAPI.onDelete('/tagrelations/5/').reply(200);

      await call();

      expect(dispatch.args[1][0].type).toEqual(actions.REMOVE_TAG_SUCCESS);
      expect(dispatch.args[1][0].payload).toBeUndefined();
    });

    it('should dispatch a REMOVE_TAG_FAILED action on failure', async () => {
      await call();

      expect(dispatch.args[1][0].type).toEqual(actions.REMOVE_TAG_FAILED);
      expect(dispatch.args[1][0].payload).toBeUndefined();
    });

    it('should dispatch an ADD_ERROR action on failure', async () => {
      mockAPI.onGet('/tagrelations/').reply(200, {
        count: 1,
        results: [{ id: 5 }],
      });
      mockAPI.onDelete('/tagrelations/5/').reply(400);

      await call();

      expect(dispatch.args[2][0].type).toEqual(ADD_ERROR);
      expect(dispatch.args[2][0].payload).toEqual(Error('Request failed with status code 400'));
    });
  });
});
