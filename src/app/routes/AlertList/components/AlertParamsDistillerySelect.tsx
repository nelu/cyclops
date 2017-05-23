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
import { Distillery } from '../../../services/distilleries/types';
import {
  shortenDistilleryName,
  sortByWarehouse
} from '../../../services/distilleries/utils';
import { DistillerySelectGroup } from '~/services/distilleries/components/DistillerySelectGroup';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParamsDistillerySelect component. */
interface Props {
  /** Currently selected distillery in alerts list search parameters. */
  currentDistillery: number| undefined;
  /** Current list of distilleries that have alerts associated with them. */
  distilleries: Distillery[];
  /**
   * Changes the currently selected distillery.
   * @param distillery Distillery to filter alerts with.
   */
  selectDistillery(distillery: number | undefined): any;
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
  public selectDistillery = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = parseInt(event.currentTarget.value, 10);
    const collection = (value === 0) ? undefined : value;

    this.props.selectDistillery(collection);
  };

  public render(): JSX.Element {
    const sortedDistilleries = sortByWarehouse(this.props.distilleries);
    const distilleryOptionGroups: JSX.Element[] = [];

    _.forEach(sortedDistilleries, (distilleries, warehouse) => {
      distilleryOptionGroups.push(
        <DistillerySelectGroup
          title={warehouse as string}
          options={distilleries}
        />,
      );
    });

    return (
      <div className="alert-list-params__spacer alert-list-params__group">
        <h3 className="sub-title">Source</h3>
        <div className="form-group">
          <select
            className="form-control"
            value={this.props.currentDistillery}
            onChange={this.selectDistillery}
          >
            <option value={0}>All</option>
            {distilleryOptionGroups}
          </select>
        </div>
      </div>
    );
  }
}
