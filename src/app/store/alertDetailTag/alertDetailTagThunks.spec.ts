// Vendor
import * as sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';

// Local
import * as thunks from './alertDetailTagThunks';
import * as actions from './alertDetailTagActions';
import * as api from '~/services/tags/services/tagAPI';
import { cyphonAPI } from '~/services/cyphon/constants';

describe('alertDetailTagSagas()', () => {
  let mockAPI: MockAdapter;
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonSpy;

  before(() => {
    mockAPI = new MockAdapter(cyphonAPI);
  });

  beforeEach(() => {
    dispatch = sinon.spy();
    getState = sinon.spy();
  });

  afterEach(() => {
    mockAPI.reset();
  });

  after(() => {
    mockAPI.restore();
  });

  describe('addTagSaga()', () => {
    const alertID = 1;
    const tagID = 4;
    const userID = 3;

    before(() => {
      mockAPI.onPost(/\/tagrelations\/$/).reply(200);
    });

    it('should make a post request to make a tag relation', async () => {
      const thunk = thunks.addTag(alertID, tagID, userID);

      await thunk(dispatch, getState, undefined);
    });

    it('should dispatch an ADD_TAG action', async () => {
      const thunk = thunks.addTag(alertID, tagID, userID);

      await thunk(dispatch, getState, undefined);

      expect(dispatch.args[0]).to.deep.equal([actions.addTag(alertID, tagID, userID)]);
    });
  });
});