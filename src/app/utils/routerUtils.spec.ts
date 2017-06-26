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
import * as utils from './routerUtils';

describe('routerUtils', () => {
  describe('parseIntParams()', () => {
    const query = {
      array: ['1', '2'],
      number: '3',
      string: 'hello',
    };

    it('should return an empty object if there is no location query', () => {
      const result = utils.parseIntParams({} as any, ['field']);

      expect(result).to.deep.equal({});
    });

    it('should return the normal query if there are no given fields', () => {
      const result = utils.parseIntParams(query, []);

      expect(result).to.deep.equal(query);
    });

    it('should parse an array of string numbers in the query', () => {
      const result = utils.parseIntParams(query, ['array']);

      expect(result).to.deep.equal({
        array: [1, 2],
        number: query.number,
        string: query.string,
      });
    });

    it('should parse a string number in the query', () => {
      const result = utils.parseIntParams(query, ['number']);

      expect(result).to.deep.equal({
        array: query.array,
        number: 3,
        string: query.string,
      });
    });

    it('should parse all given fields', () => {
      const result = utils.parseIntParams(query, ['number', 'array']);

      expect(result).to.deep.equal({
        array: [1, 2],
        number: 3,
        string: query.string,
      });
    });
  });

  describe('forceArrayParams()', () => {
    const query = {
      array: [1, 2],
      single: 3,
      normal: 4,
    };

    it('should return an array parameter for a query that has a ' +
      'single value for the parameter', () => {
      const result = utils.forceArrayParams(query, ['single']);

      expect(result).to.deep.equal({
        ...query,
        single: [query.single],
      });
    });

    it('should return an array parameter for a parameter that is already ' +
      'an array', () => {
      const result = utils.forceArrayParams(query, ['array']);

      expect(result).to.deep.equal(query);
    });
  });

  describe('parseQuery()', () => {
    const query = {
      array: ['1', '2'],
      single: '5',
      normal: '6',
    };

    it('should parse the specified array fields', () => {
      const result = utils.parseQuery(query, { arrays: ['single', 'array'] });

      expect(result).to.deep.equal({
        ...query,
        single: [query.single],
      });
    });

    it('should parse the specified integers', () => {
      const result = utils.parseQuery(query, { integers: ['single', 'array'] });

      expect(result).to.deep.equal({
        ...query,
        array: [1, 2],
        single: 5,
      });
    });

    it('should perform a combination of parsing options', () => {
      const result = utils.parseQuery(query, {
        integers: ['single', 'array'],
        arrays: ['single', 'array'],
      });

      expect(result).to.deep.equal({
        ...query,
        array: [1, 2],
        single: [5],
      });
    });
  });
});
