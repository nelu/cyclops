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

// Vendor
import MockAdapter from 'axios-mock-adapter';

// Local
import * as thunks from './tagStoreThunks';
import * as actions from './tagStoreActions';
import { cyphonAPI } from '~/services/cyphon/constants';
import { addError } from '~/store/errorModal';

describe('tagStoreThunks', () => {
  let dispatch: jest.Mock;
  let getState: jest.Mock;
  let mockApi: MockAdapter;

  beforeAll(() => {
    mockApi = new MockAdapter(cyphonAPI);
    dispatch = jest.fn();
    getState = jest.fn();
  });

  afterEach(() => {
    mockApi.reset();
    dispatch.mockReset();
    getState.mockReset();
  });

  afterAll(() => {
    mockApi.restore();
  });

  describe('fetchTags()', () => {
    let call: () => Promise<void>;

    beforeEach(() => {
      call = () => thunks.fetchTags()(dispatch, getState, undefined);
    });

    it('should perform a successful api call', async () => {
      const tag1: any = { id: 1 };
      const tag2: any = { id: 2 };

      mockApi.onGet('/tags/').reply(200, {
        count: 3,
        next: '/tags/?page=2',
        previous: null,
        results: [tag1],
      });
      mockApi.onGet('/tags/?page=2').reply(200, {
        count: 3,
        next: null,
        previous: '/tags/',
        results: [tag2],
      });

      await call();

      expect(dispatch.mock.calls).toHaveLength(2);
      expect(dispatch.mock.calls[0]).toEqual([actions.fetchTagsPending()]);
      expect(dispatch.mock.calls[1]).toEqual([actions.fetchTagsSuccess([tag1, tag2])]);
    });

    it('should perform a failed api call', async () => {
      await call();

      expect(dispatch.mock.calls).toHaveLength(3);
      expect(dispatch.mock.calls[0]).toEqual([actions.fetchTagsPending()]);
      expect(dispatch.mock.calls[1]).toEqual([actions.fetchTagsFailure()]);
      expect(dispatch.mock.calls[2])
        .toEqual([addError(new Error('Request failed with status code 404'))]);
    });
  });
});
