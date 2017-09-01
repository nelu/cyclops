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
import * as enzyme from 'enzyme';

// Local
import { AlertParamsCategorySelect } from './AlertParamsCategorySelect';
import {
  Category,
  NormalizedCategoryList,
} from '~/services/alerts/types';

describe('<AlertParamsCategorySelect />', () => {
  const category1: Category = { id: 1, name: 'Category1' };
  const category2: Category = { id: 2, name: 'Category2' };
  const categories = [
    category1,
    category2,
  ];
  const normalized: NormalizedCategoryList = {
    result: [category1.id, category2.id],
    entities: {
      categories: {
        [category1.id]: category1,
        [category2.id]: category2,
      },
    },
  };
  const defaultProps = {
    categories: normalized,
  };
  let selectCategory: sinon.SinonSpy;
  let render: (props?: any) => enzyme.ShallowWrapper<any, any>;

  beforeEach(() => {
    selectCategory = sinon.spy();
    render = (props) => {
      const properties = Object.assign({}, defaultProps, props);
      return enzyme.shallow(
        <AlertParamsCategorySelect
          {...properties}
          change={selectCategory}
        />);
    };
  });

  it('should display the options of a normalized category list', () => {
    const listGroupItems = render().find('ListGroupItemToggle');

    chai.expect(listGroupItems).to.have.length(2);

    listGroupItems.forEach((item, index) => {
      chai.expect(item.prop('value')).to.equal(categories[index].id);
      chai.expect(item.prop('currentValue')).to.be.undefined;
      chai.expect(item.prop('onClick')).to.equal(selectCategory);
    });
  });

  it('should display a CollapsibleHeader', () => {
    const component = render();
    const instance: any = component.instance();
    const collapsible = component.find('CollapsibleHeader');

    chai.expect(collapsible).to.have.length(1);
    chai.expect(collapsible.prop('title')).to.equal('Category');
    chai.expect(collapsible.prop('action')).to.equal(instance.clearSelections);
    chai.expect(collapsible.prop('actionName')).to.equal('Clear');
    chai.expect(collapsible.prop('spaced')).to.equal(true);
  });

  describe('onSelectChange', () => {
    it('should parse an integer value from a string and pass that ' +
      'to select', () => {
      const component: any = render().instance();

      component.onSelectChange('4');

      chai.expect(selectCategory.called).to.be.true;
      chai.expect(selectCategory.args[0][0]).to.equal(4);
    });
  });

  describe('clearSelections()', () => {
    it('should pass undefined to the select prop', () => {
      const component: any = render().instance();

      component.clearSelections();

      chai.expect(selectCategory.called).to.be.true;
      chai.expect(selectCategory.args[0][0]).to.be.undefined;
    });
  });
});
