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

// Local
import * as query from './query';

describe('query', () => {
  describe('getSearchQueryFields()', () => {
    it('should parse a single field', () => {
      const result = query.getSearchQueryFields('field');

      expect(result).to.deep.equal([{
        source: 'field',
        field: 'field',
        operator: undefined,
        value: undefined,
      }]);
    });

    it('should parse a field and operator', () => {
      const result = query.getSearchQueryFields('field>');

      expect(result).to.deep.equal([{
        source: 'field>',
        field: 'field',
        operator: '>',
        value: undefined,
      }]);
    });

    it('should parse a field, operator, and value', () => {
      const result = query.getSearchQueryFields('field._nested<=word');

      expect(result).to.deep.equal([{
        source: 'field._nested<=word',
        field: 'field._nested',
        operator: '<=',
        value: 'word',
      }]);
    });

    it('should trim quotations off of a value', () => {
      const result = query.getSearchQueryFields('field._nested<="word"');

      expect(result).to.deep.equal([{
        source: 'field._nested<="word"',
        field: 'field._nested',
        operator: '<=',
        value: 'word',
      }]);
    });

    it('should display multiple fields', () => {
      const result = query.getSearchQueryFields(
        'field._nested<="word" _super.field!~10.4.3',
      );

      expect(result).to.deep.equal([{
        source: 'field._nested<="word"',
        field: 'field._nested',
        operator: '<=',
        value: 'word',
      }, {
        source: '_super.field!~10.4.3',
        field: '_super.field',
        operator: '!~',
        value: '10.4.3',
      }]);
    });
  });
});


