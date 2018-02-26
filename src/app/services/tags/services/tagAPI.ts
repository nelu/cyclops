import { TagRelationContentTypes } from '~/services/tags/types/TagRelationContentTypes';
import { TagDetail } from '~/services/tags/types';
import { del, get, post } from '~/services/cyphon/utils/cyphonAPI';
import { TagRelation } from '~/services/tags/types/TagRelation';

/**
 * Adds a tag relation to a given object.
 * @param {TagRelationContentTypes} type Type of object to relate the tag to.
 * @param {number} objectID ID of the object to relate the tag to.
 * @param {number} tagID ID of that tag to relate the object to.
 * @param {number} userID ID of the user who made the relation.
 * @returns {Promise<TagDetail>}
 */
export function addTagRelation(
  type: TagRelationContentTypes,
  objectID: number,
  tagID: number,
  userID?: number,
): Promise<TagDetail> {
  return post('/tagrelations/', {
    content_type: type,
    object_id: objectID,
    tag: tagID,
    tagged_by: userID,
  });
}

/**
 * Finds a tag relation based on select parameters.
 * @param {TagRelationContentTypes} contentType
 * @param {number} objectID
 * @param {number} tagID
 * @returns {Promise<any>}
 */
export function findTagRelation(
  contentType: TagRelationContentTypes,
  objectID: number,
  tagID: number,
): Promise<TagRelation> {
  return get('/tagrelations/', {
    params: {
      content_type: contentType,
      object_id: objectID,
      tag: tagID,
    },
  });
}

/**
 * Deletes a tag relation based on it's ID.
 * @param {number} tagRelationID
 * @returns {Promise<TagRelation>}
 */
export function deleteTagRelation(tagRelationID: number): Promise<TagRelation> {
  return del(`/tagrelations/${tagRelationID}`);
}
