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

// Local
import {
  Category,
  NormalizedCategoryList,
} from '~/services/alerts/types';
import { denormalizeCategories } from '~/services/alerts/utils/categoryUtils';
import { Collapsible } from '~/components/Collapsible';
import { CategoryAutocomplete } from '~/services/alerts/components/CategoryAutocomplete';
import { toggleArrayValue } from '~/utils/arrayUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsCategorySelect component. */
interface Props {
  /** List of all the current categories. */
  categories: NormalizedCategoryList;
  /** Currently selected category. */
  selected?: number[];
  /**
   * Selects a category to filter alerts with.
   * @param category Category to filter alerts with.
   */
  change(categories?: number[]): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays options for filtering alerts by category.
 */
export class AlertParamsCategorySelect extends React.Component<Props, {}> {
  /** Clears the current category selections. */
  public clearSelections = (): void => {
    this.props.change(undefined);
  };

  public toggleCategory = (category: Category) => {
    const categories = toggleArrayValue(category.id, this.props.selected);

    this.props.change(categories);
  };

  public render() {
    const categories = denormalizeCategories(this.props.categories);

    return (
      <div className="sidebar__spacing">
        <Collapsible
          title="Category"
          action={this.clearSelections}
          actionName="Clear"
        >
          <CategoryAutocomplete
            categories={categories}
            selected={this.props.selected}
            onSelect={this.toggleCategory}
            onRemove={this.toggleCategory}
          />
        </Collapsible>
      </div>
    );
  }
}
