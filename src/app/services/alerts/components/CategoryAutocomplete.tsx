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
import * as _ from 'lodash';

// Local
import { Category } from '~/services/alerts/types';
import { MultiAutocomplete } from '~/components/MultiAutocomplete';
import { findByID } from '~/utils/arrayUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the CategoryAutocomplete component. */
interface Props {
  /** Categories to select. */
  categories: Category[];
  /** ID of the currently selected category. */
  selected?: number[];
  /**
   * Function run whenever a category is selected.
   * @param category Selected category.
   */
  onSelect(category: Category): void;
  onRemove(category: Category): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Display an Autocomplete component that selects alert categories.
 */
export class CategoryAutocomplete extends React.Component<Props, {}> {
  /**
   * Returns the category name.
   * @param category Category to retrieve name from.
   */
  public static getCategoryName = (category: Category): string => category.name;

  /**
   * Determines if a category is currently selected.
   * @param category Category to check.
   * @param selected ID's of the currently selected categories.
   * @returns {boolean} If the category is selected.
   */
  public static isCategorySelected = (
    category: Category,
    selected?: number[],
  ): boolean => {
    return selected ? _.includes(selected, category.id) : false;
  };

  public static getCategoryKey = (category: Category): number => {
    return category.id;
  };

  public render() {
    return (
      <MultiAutocomplete
        items={this.props.categories}
        selected={this.props.selected}
        removeItem={this.props.onRemove}
        getValue={CategoryAutocomplete.getCategoryName}
        onSelect={this.props.onSelect}
        placeholder="Select Category"
        isSelected={CategoryAutocomplete.isCategorySelected}
        getKey={CategoryAutocomplete.getCategoryKey}
      />
    );
  }
}
