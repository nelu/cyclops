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
import * as React from 'react';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as enzyme from 'enzyme';

// Local
import { JSONFormatter } from './JSONFormatter';

describe('<JSONFormatter />', () => {
  let wrapper: enzyme.ShallowWrapper<any, any>;

  describe('addTargetBlankToLinks()', () => {
    let element: any;
    let links: any[];

    beforeEach(() => {
      links = [{}, {}];
      element = { getElementsByTagName: sinon.stub().returns(links) };
    });

    it('should add target="_blank" to an element with links', () => {
      JSONFormatter.addTargetBlankToLinks(element);

      links.forEach((link) => {
        chai.expect(link.target).to.equal('_blank');
      });
    });
  });

  it('should create a div with a randomized ID', () => {
    wrapper = enzyme.shallow(<JSONFormatter json={1} />);
    chai.expect(wrapper.type()).to.equal('div');
    chai.expect(wrapper.props().id.slice(0, 2)).to.equal('id');
  });
});
