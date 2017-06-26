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
import { ListGroupItemToggle } from './ListGroupItemToggle';

describe('<ListGroupItemToggle />', () => {
  let component: (props?: any) => enzyme.ShallowWrapper<any, any>;
  let onClick: sinon.SinonSpy;

  beforeEach(() => {
    component = (props) => {
      onClick = sinon.spy();
      const defaults = {
        onClick,
      };
      const passed = Object.assign({}, defaults, props);

      return enzyme.shallow(<ListGroupItemToggle {...passed} />);
    };
  });

  it('should display a ListGroupItem', () => {
    const wrapper = component();

    expect(wrapper.find('ListGroupItem')).to.have.length(1);
  });

  it('should run onClick when clicked', () => {
    const wrapper = component();

    wrapper.simulate('click');

    expect(onClick.called).to.be.true;
  });

  it('should display an active ListGroupItem if the value is equal to or is ' +
    'included in the currentValue', () => {
    const test = (value: any, currentValue: any): boolean => {
      return component({ value, currentValue })
        .find('ListGroupItem')
        .first()
        .prop<boolean>('active');
    };

    expect(test(3, 3)).to.be.true;
    expect(test(3, [3])).to.be.true;
    expect(test(3, 4)).to.be.false;
    expect(test(3, [4])).to.be.false;
    expect(test(5, undefined)).to.be.false;
  });

  it('should toggle the value from the current value', () => {
    const test = (value: any, currentValue: any): any => {
      component({ value, currentValue }).simulate('click');

      return onClick.args[0][0];
    };

    expect(test(3, 3)).to.be.undefined;
    expect(test(3, undefined)).to.equal(3);
    expect(test(3, 4)).to.deep.equal([4, 3]);
    expect(test(3, [4, 3])).to.equal(4);
  });
});
