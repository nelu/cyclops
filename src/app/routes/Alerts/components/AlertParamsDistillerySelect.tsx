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
import { DistilleryMinimal } from '~/services/distilleries/types';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { DistilleryMultiAutocomplete } from '~/services/distilleries/components/DistilleryMultiAutocomplete';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsDistillerySelect component. */
interface Props {
  /** Currently selected distillery in alerts list search parameters. */
  selected?: number[];
  /** Current list of distilleries that have alerts associated with them. */
  distilleries: DistilleryMinimal[];
  /**
   * Changes the currently selected distillery.
   * @param distillery Distillery to filter alerts with.
   */
  onSelect(distillery: number): void;
  onRemove(distillery: number): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a select dropdown of distilleries to filter alerts with.
 */
export class AlertParamsDistillerySelect extends React.Component<Props, {}> {
  /**
   * Selects the new distillery to filter alerts with.
   * @param event Event emitted from the select DOM element.
   */
  public onSelect = (distillery: DistilleryMinimal) => {
    this.props.onSelect(distillery.id);
  };

  public onRemove = (distillery: DistilleryMinimal) => {
    this.props.onRemove(distillery.id);
  };

  public render(): JSX.Element {
    return (
      <div className="alert-list-params__spacer alert-list-params__group">
        <CollapsibleHeader title="Source">
          <DistilleryMultiAutocomplete
            distilleries={this.props.distilleries}
            selected={this.props.selected}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
          />
        </CollapsibleHeader>
      </div>
    );
  }
}
