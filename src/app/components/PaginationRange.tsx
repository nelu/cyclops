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
import { getResultPaginationRange } from '~/utils/getResultPaginationRange';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the PaginationRange component. */
interface Props {
  page: number;
  size: number;
  count: number;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Current page range of results.
 */
export class PaginationRange extends React.Component<Props, {}> {
  public render() {
    const range = getResultPaginationRange(
      this.props.page,
      this.props.size,
      this.props.count,
    );

    return (
      <span>
        <span className="text--base">Showing </span>
        {range.start} - {range.end}
        <span className="text--base"> of </span>
        {this.props.count}
      </span>
    );
  }
}
