// Vendor
import * as sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';

// Local
import * as thunks from './alertDetailTagThunks';
import * as actions from './alertDetailTagActions';
import * as api from '~/services/tags/services/tagAPI';
import { cyphonAPI } from '~/services/cyphon/constants';
import { ADD_ERROR, addError } from '~/store/errorModal';

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
    const alertID = 1;
    const tagID = 4;
    const userID = 3;
    const url = /\/tagrelations\/$/;

    it('should make a post request to make a tag relation', async () => {
      const body = {
        content_type: 'alert',
        object_id: alertID,
        tag: tagID,
        tagged_by: userID,
      };
      const thunk = thunks.addTag(alertID, tagID, userID);

      mockAPI.onPost(/\/tagrelations\//, body).reply(200);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagSuccess(alertID, tagID, userID)]);
    });

    it('should dispatch an ADD_TAG action', async () => {
      const thunk = thunks.addTag(alertID, tagID, userID);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[0]).toEqual([actions.addTag(alertID, tagID, userID)]);
    });

    it('should dispatch an ADD_TAG_SUCCESS action on a successful request', async () => {
      const thunk = thunks.addTag(alertID, tagID, userID);

      mockAPI.onPost(url).reply(200);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagSuccess(alertID, tagID, userID)]);
    });

    it('should dispatch an ADD_TAG_FAILURE and ADD_ERROR action on an ' +
      'unsuccessful request', async () => {
      const thunk = thunks.addTag(alertID, tagID, userID);
      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[1]).toEqual([actions.addTagFailure(alertID, tagID, userID)]);
      expect(dispatch.args[2][0].type).toEqual(ADD_ERROR);
    });
  });
});