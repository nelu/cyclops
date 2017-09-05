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
    categories,
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

  it('should display an Autocomplete option', () => {
    const autocomplete = render().find('CategoryAutocomplete');

    chai.expect(autocomplete).to.have.length(1);
    chai.expect(autocomplete.prop('categories')).to.equal(categories);
  });

  it('should display a CollapsibleHeader', () => {
    const component = render();
    const instance: any = component.instance();
    const collapsible = component.find('CollapsibleHeader');

    chai.expect(collapsible).to.have.length(1);
    chai.expect(collapsible.prop('title')).to.equal('Category');
    chai.expect(collapsible.prop('action')).to.equal(instance.clearSelections);
    chai.expect(collapsible.prop('actionName')).to.equal('Clear');
  });
});
