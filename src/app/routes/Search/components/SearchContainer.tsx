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
import { Field } from '~/services/cyphon/types';
import { ContainerNested } from '~/services/containers/types';
import { SearchField } from './SearchField';
import { Collapsible } from '~/components/Collapsible';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchContainer component. */
interface Props {
  container: ContainerNested;
  open: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Information about a Container object that helps aid in creating
 * search queries.
 */
export class SearchContainer extends React.Component<Props, {}> {
  public render() {
    const fields = this.props.container.fields.map((field) => (
      <SearchField field={field} />
    ));

    return (
      <div>
        <Collapsible descriptor={this.props.container.name} open={this.props.open}>
          <div className="tabbed tabbed--border">
            <div className="tabbed__title text--muted">Fields</div>
            {fields}
          </div>
        </Collapsible>
      </div>
    );
  }
}
