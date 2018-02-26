// Vendor
import * as sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';

// Local
import * as api from './tagAPI';
import { cyphonAPI } from '~/services/cyphon/constants';
import { TagRelation } from '~/services/tags/types/TagRelation';

describe('tagAPI', () => {
  let mockAPI: MockAdapter;

  before(() => {
    mockAPI = new MockAdapter(cyphonAPI);
  });

  after(() => {
    mockAPI.restore();
  });

  afterEach(() => {
    mockAPI.reset();
  });

  describe('addTagRelation()', () => {
    const url = /\/tagrelations\/$/;

    it('should send a post request', async () => {
      mockAPI.onPost(url).reply(200);

      await api.addTagRelation('alert', 1, 3);
    });

    it('should send a request with the correct post body', async () => {
      const contentType = 'alert';
      const objectID = 1;
      const tagID = 4;
      const userID = 3;

      mockAPI.onPost(url, {
        content_type: contentType,
        object_id: objectID,
        tag: tagID,
        tagged_by: userID,
      }).reply(200);

      await api.addTagRelation(contentType, objectID, tagID, userID);
    });
  });
});
