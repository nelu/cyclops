// Local
import * as actions from './alertDetailTagActions';

describe('alertDetailTagActions', () => {
  describe('addTag()', () => {
    it('should create an ADD_TAG action', () => {
      const alertID = 1;
      const tagID = 5;

      expect(actions.addTag(alertID, tagID)).to.deep.equal({
        type: actions.ADD_TAG,
        payload: { alertID, tagID },
      });
    });
  });

  describe('addTagSuccess()', () => {
    it('should create an ADD_TAG_SUCCESS action', () => {
      const alertID = 3;
      const tagID = 8;
      expect(actions.addTagSuccess(alertID, tagID)).to.deep.equal({
        type: actions.ADD_TAG_SUCCESS,
        payload: { alertID, tagID },
      });
    });
  });

  describe('addTagFailure()', () => {
    it('should create an ADD_TAG_FAILURE action', () => {
      const alertID = 5;
      const tagID = 3;

      expect(actions.addTagFailure(alertID, tagID)).to.deep.equal({
        type: actions.ADD_TAG_FAILURE,
        payload: { alertID, tagID },
      });
    });
  });

  describe('openPanel()', () => {
    it('should create an OPEN_PANEL action', () => {
      const alertID = 3;

      expect(actions.openPanel(alertID)).to.deep.equal({
        type: actions.OPEN_PANEL,
        payload: alertID,
      });
    });
  });

  describe('cancelModifications()', () => {
    it('should create a CANCEL_MODIFICATIONS action', () => {
      const alertID = 8;

      expect(actions.cancelModifications(alertID)).to.deep.equal({
        type: actions.CANCEL_MODIFICATIONS,
        payload: alertID,
      });
    });
  });

  describe('showRemovalConfirmation()', () => {
    it('should create a SHOW_REMOVAL_CONFIRMATION action', () => {
      const alertID = 3;
      const tagID = 7;

      expect(actions.showRemovalConfirmation(alertID, tagID)).to.deep.equal({
        type: actions.SHOW_REMOVAL_CONFIRMATION,
        payload: { alertID, tagID },
      });
    });
  });

  describe('cancelTagRemoval()', () => {
    it('should create a CANCEL_TAG_REMOVAL action', () => {
      const alertID = 3;
      const tagID = 7;

      expect(actions.cancelTagRemoval(alertID, tagID)).to.deep.equal({
        type: actions.CANCEL_TAG_REMOVAL,
        payload: { alertID, tagID },
      });
    });
  });

  describe('removeTag()', () => {
    it('should create a REMOVE_TAG action', () => {
      const alertID = 10;
      const tagID = 3;

      expect(actions.removeTag(alertID, tagID)).to.deep.equal({
        type: actions.REMOVE_TAG,
        payload: { alertID, tagID },
      });
    });
  });

  describe('removeTagSuccess()', () => {
    it('should create a REMOVE_TAG_SUCCESS action', () => {
      const alertID = 3;
      const tagID = 2;

      expect(actions.removeTagSuccess(alertID, tagID)).to.deep.equal({
        type: actions.REMOVE_TAG_SUCCESS,
        payload: { alertID, tagID },
      });
    });
  });

  describe('removeTagFailed()', () => {
    it('should should create a REMOVE_TAG_FAILED action', () => {
      const alertID = 6;
      const tagID = 2;

      expect(actions.removeTagFailed(alertID, tagID)).to.deep.equal({
        type: actions.REMOVE_TAG_FAILED,
        payload: { alertID, tagID },
      });
    });
  });
});
