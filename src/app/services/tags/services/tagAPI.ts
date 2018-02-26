import { TagRelationContentTypes } from '~/services/tags/types/TagRelationContentTypes';
import { TagDetail } from '~/services/tags/types';
import { post } from '~/services/cyphon/utils/cyphonAPI';

/**
 * Adds a tag relation to a given object.
 * @param {TagRelationContentTypes} type Type of object to relate the tag to.
 * @param {number} objectID ID of the object to relate the tag to.
 * @param {number} tagID ID of that tag to relate the object to.
 * @param {number} userID ID of the user who made the relation.
 * @returns {Promise<TagDetail>}
 */
export const addTagRelation = (
  type: TagRelationContentTypes,
  objectID: number,
  tagID: number,
  userID?: number,
): Promise<TagDetail> => post('/tagrelations/', {
  content_type: type,
  object_id: objectID,
  tag: tagID,
  tagged_by: userID,
});
