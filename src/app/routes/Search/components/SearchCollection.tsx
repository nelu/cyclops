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
import { DistilleryNested } from '~/services/distilleries/types';
import { Collapsible } from '~/components/Collapsible';
import { shortenDistilleryName } from '~/services/distilleries/utils/distilleryUtils';
import { SearchField } from '~/routes/Search/components/SearchField';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchDistillery component. */
interface Props {
  distillery: DistilleryNested;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays field and container information about a distillery.
 */
export class SearchDistillery extends React.Component<Props, {}> {
  public render() {
    const shortenedDistilleryName = shortenDistilleryName(
      this.props.distillery.name,
    );
    const fields = this.props.distillery.container.fields.map((field) => (
      <SearchField key={field.field_name} field={field} />
    ));

    return (
      <div>
        <Collapsible descriptor={shortenedDistilleryName} open={false}>
          <div className="tabbed tabbed--border">
            <div className="tabbed__title text--muted">Container</div>
            <div>{this.props.distillery.container.name}</div>
            <div className="tabbed__title text--muted">Fields</div>
            {fields}
          </div>
        </Collapsible>
      </div>
    );
  }
}
