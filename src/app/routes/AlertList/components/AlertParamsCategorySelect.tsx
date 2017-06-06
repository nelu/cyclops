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
import { ListGroup } from 'react-bootstrap';

// Local
import { NormalizedCategoryList } from '~/services/alerts/types';
import { denormalizeCategories } from '~/services/alerts/utils/categoryUtils';
import { ListGroupItemToggle } from '~/components/ListGroupItemToggle';
import { Collapsible } from '~/components/Collapsible';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsCategorySelect component. */
interface Props {
  /** List of all the current categories. */
  categories: NormalizedCategoryList;
  /** Currently selected category. */
  currentCategory?: number | number[];
  /**
   * Selects a category to filter alerts with.
   * @param category Category to filter alerts with.
   */
  selectCategory(category?: number | number[]): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays options for filtering alerts by category.
 */
export class AlertParamsCategorySelect extends React.Component<Props, {}> {
  /**
   * Handles the select on change event to select a category.
   * @param value Value from the select element onChange event.
   */
  public onSelectChange = (value: string): void => {
    const category = parseInt(value, 10);

    this.props.selectCategory(category);
  };

  /** Clears the current category selections. */
  public clearSelections = (): void => {
    this.props.selectCategory(undefined);
  };

  public render() {
    const categories = denormalizeCategories(this.props.categories);
    const listGroupItems = categories.map((category) => (
      <ListGroupItemToggle
        value={category.id}
        currentValue={this.props.currentCategory}
        onClick={this.props.selectCategory}
        key={category.id}
      >
        {category.name}
      </ListGroupItemToggle>
    ));

    return (
      <Collapsible
        title="Category"
        action={this.clearSelections}
        actionName="Clear"
        spaced={true}
      >
        <ListGroup>
          {listGroupItems}
        </ListGroup>
      </Collapsible>
    );
  }
}
