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
import { AlertSearchResults } from '~/services/search/types';
import { JSONFormatter } from '~/components/JSONFormatter';
import { SearchAlertResult } from '~/routes/Search/components/SearchAlertResult';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchAlertResults component. */
interface Props {
  results: AlertSearchResults | null;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the alert results returned from a search query.
 */
export class SearchAlertResults extends React.Component<Props, {}> {
  public render() {
    const results: JSX.Element[] | null = this.props.results
      ? this.props.results.results.map((result) => (
        <SearchAlertResult alert={result}/>
      )) : null;

    return (
      <div>{results}</div>
    );
  }
}
