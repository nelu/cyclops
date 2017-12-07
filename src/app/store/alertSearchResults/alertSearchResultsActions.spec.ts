// Vendor
import * as sinon from 'sinon';
import * as chai from 'chai';

// Local
import * as actions from './alertSearchResultsActions';

describe('alertSearchResultsActions', () => {
  describe('paginateAlertResultsPending()', () => {
    it('should create a PAGINATE_ALERT_RESULTS_PENDING action', () => {
      const promiseID = Symbol();
      const action = actions.paginateAlertResultsPending(promiseID);

      expect(action).to.deep.equal({
        type: actions.PAGINATE_ALERT_RESULTS_PENDING,
        payload: promiseID,
      });
    });
  });
});