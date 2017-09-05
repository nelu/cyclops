/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the 'Agreement”). You
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
import * as sinon from 'sinon';

// Local
import * as utils from './distilleryNormalizr';

describe('distilleryNormalizr', () => {
  const taste = {
    id: 1,
    author: '',
    title: 'subject',
    container: 1,
    content: 'content',
    location: 'location',
    location_format: 'LNG/LAT',
    datetime: 'date',
    date_string: '',
    date_format: '',
    url: '',
  };
  const field1 = {
    field_name: 'field',
    target_type: 'Keyword',
    field_type: 'CharField',
  };
  const field2 = {
    field_name: 'location',
    target_type: 'Location',
    field_type: 'PointField',
  };
  const field3 = {
    field_name: 'date',
    target_type: 'DateTime',
    field_type: 'DateTimeField',
  };
  const container1 = {
    bottle: 1,
    id: 1,
    fields: [
      field1,
      field2,
    ],
    label: 1,
    name: 'container1',
    url: '',
    taste,
  };
  const container1Entitiy = Object.assign({}, container1, {
    fields: [field1.field_name, field2.field_name],
    taste: taste.id,
  });
  const container2 = {
    id: 2,
    bottle: 2,
    fields: [
      field1,
      field3,
    ],
    label: 1,
    name: 'container2',
    url: '',
    taste,
  };
  const container2Entity = Object.assign({}, container2, {
    fields: [field1.field_name, field3.field_name],
    taste: taste.id,
  });
  const filter = {
    id: 1,
    context: 1,
    search_field: 'subject',
    operator: 'eq',
    operator_text: 'equals',
    value_field: 'subject',
    url: '',
  };
  const context = {
    id: 1,
    name: 'context',
    primary_distillery: {
      id: 1,
      name: 'backend.group.name',
      url: '',
    },
    related_distillery: {
      id: 2,
      name: 'backend.group.name',
      url: '',
    },
    before_time_interval: 30,
    before_time_unit: 'm',
    after_time_interval: 30,
    after_time_unit: 'm',
    filters: [filter],
    filter_logic: 'AND',
    url: '',
  };
  const contextEntity = Object.assign({}, context, {
    filters: [filter.id],
  });
  const distillery1 = {
    collection: 1,
    container: container1,
    contexts: [],
    id: 1,
    name: 'backend.store.name',
    url: '',
  };
  const distillery1Entity = Object.assign({}, distillery1, {
    container: container1.id,
  });
  const distillery2 = {
    collection: 2,
    container: container2,
    contexts: [context],
    id: 2,
    name: 'backend.store.name',
    url: '',
  };
  const distiller2Entity = Object.assign({}, distillery2, {
    container: container2.id,
    contexts: [context.id],
  });
  const distilleries = [distillery1, distillery2];
  const normalized = {
    result: [distillery1.id, distillery2.id],
    entities: {
      containers: {
        [container1.id]: container1Entitiy,
        [container2.id]: container2Entity,
      },
      contextFilters: {
        [filter.id]: filter,
      },
      contexts: {
        [context.id]: contextEntity,
      },
      distilleries: {
        [distillery1.id]: distillery1Entity,
        [distillery2.id]: distiller2Entity,
      },
      fields: {
        [field1.field_name]: field1,
        [field2.field_name]: field2,
        [field3.field_name]: field3,
      },
      tastes: {
        [taste.id]: taste,
      },
    },
  };

  describe('normalizeDistilleries()', () => {
    it('should normalize a list of nested distilleries', () => {
      const result = utils.normalizeDistilleries(distilleries);

      chai.expect(result).to.deep.equal(normalized);
    });
  });

  describe('denormalizeDistilleries()', () => {
    it('should denormalize a normalized list of distilleries', () => {
      const result = utils.denormalizeDistilleries(normalized as any);

      chai.expect(result).to.deep.equal(distilleries);
    });
  });

  describe('getDistilleryContainerIDs', () => {
    it('should return empty if there are no distillery entities', () => {
      const result = utils.getDistilleryContainerIDs(
        { result: [], entities: {} },
        [3, 4],
      );

      expect(result).to.deep.equal([]);
    });

    it('should return the container ids if ther are distilleries', () => {
      const result = utils.getDistilleryContainerIDs(
        normalized as any,
        [distillery1.id, distillery2.id],
      );

      expect(result).to.deep.equal([container1.id, container2.id]);
    });
  });

  describe('getSharedDistilleryFields()', () => {
    it('should return empty if there are no distilleries', () => {
      const result = utils.getSharedDistilleryFields(
        { result: [], entities: {} },
        [3, 4],
      );

      expect(result).to.deep.equal([]);
    });

    it('should return emptoy if there no containers', () => {
      const test: any = {
        result: [],
        entities: {
          distilleries: {
            1: {
              container: {
                id: 1,
              },
            }
          }
        },
      };
      const result = utils.getSharedDistilleryFields(test, [1]);

      expect(result).to.deep.equal([]);
    });

    it('should return the shared fields', () => {
      const result = utils.getSharedDistilleryFields(
        normalized as any,
        [distillery1.id, distillery2.id],
      );

      expect(result).to.deep.equal([field1]);
    });
  });
});
