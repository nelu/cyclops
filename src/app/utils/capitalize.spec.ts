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
import * as chai from 'chai';

// Local
import { capitalize, lowercaseKeys } from './capitalize';

describe('capitalize', () => {
  it('should capitalize a string', () => {
    const str = 'hello';
    const result = capitalize(str);

    chai.expect(result).to.equal('Hello');
  });
});

describe('lowercaseKeys', () => {
  it('should lowercase the keys of an object', () => {
    const object = {
      AH: 'test',
      MEH: 'test',
    };
    const lowercased = lowercaseKeys(object);

    chai.expect(lowercased).to.deep.equal({
      ah: 'test',
      meh: 'test',
    });
  });
});
