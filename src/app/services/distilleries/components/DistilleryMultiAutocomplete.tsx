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
import { Autocomplete } from '~/components/Autocomplete';
import { MultiAutocomplete } from '~/components/MultiAutocomplete';
import { DistilleryMinimal } from '~/services/distilleries/types';
import { shortenDistilleryName } from '~/services/distilleries/utils/distilleryUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the DistilleryMultiAutocomplete component. */
interface Props {
  /** Distillery options to display. */
  distilleries: DistilleryMinimal[];
  /** ID of the currently selected distillery. */
  selected?: number[];
  /**
   * Function run when a distillery is selected.
   * @param id  ID of the selected distillery.
   */
  onSelect(distillery: DistilleryMinimal): void;
  onRemove(distillery: DistilleryMinimal): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Creates an autocomplete component that helps select a distillery.
 */
export class DistilleryMultiAutocomplete extends React.Component<Props, {}> {
  /**
   * Returns the selected distillery from the given list.
   * @returns {DistilleryMinimal | undefined}
   */
  public getSelectedDistillery = (): DistilleryMinimal | undefined => {
    return this.props.selected
      ? _.find<any>(this.props.distilleries, ['id', this.props.selected])
      : undefined;
  };

  /**
   * Returns the string value to use as the Autocomplete component value.
   * @returns {string}
   */
  public getAutocompleteValue = (): string => {
    const distillery = this.getSelectedDistillery();

    return distillery ? shortenDistilleryName(distillery.name) : '';
  };

  public getDistilleryName = (distillery: DistilleryMinimal): string => {
    return shortenDistilleryName(distillery.name);
  };

  public getDistilleryID = (distillery: DistilleryMinimal): number => {
    return distillery.id;
  };

  public isDistillerySelected = (
    distillery: DistilleryMinimal,
    selected?: number[],
  ) => {
    return selected ? _.includes(selected, distillery.id) : false;
  };

  public remove = () => {
    return;
  };

  public render() {
    return (
      <MultiAutocomplete
        getValue={this.getDistilleryName}
        getKey={this.getDistilleryID}
        selected={this.props.selected}
        isSelected={this.isDistillerySelected}
        items={this.props.distilleries}
        removeItem={this.props.onRemove}
        onSelect={this.props.onSelect}
        placeholder="Select Source"
      />
    );
  }
}
