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
import * as classnames from 'classnames';

// Local
import { SearchQuery as SearchQueryInterface } from '~/services/search/types';
import { Collapsible } from '~/components/Collapsible';
import { SearchQueryErrors } from '~/routes/Search/components/SearchQueryErrors';
import { SearchQueryKeywords } from '~/routes/Search/components/SearchQueryKeywords';
import { SearchQueryFields } from '~/routes/Search/components/SearchQueryFields';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchQuery component. */
interface Props {
  query: SearchQueryInterface;
  valid: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays information about a search query.
 */
export class SearchQuery extends React.Component<Props, {}> {
  public render() {
    const errors = this.props.query.errors.map((error) => (
      <p className="alert-text--high">{error}</p>
    ));
    const keywords = this.props.query.keywords
      ? this.props.query.keywords.map((parameter) => (
        <div>"{parameter.keyword}"</div>
      ))
      : 'None';
    const errorIcon = !this.props.valid
      ? <i className="fa fa-exclamation-triangle alert-text--high icon-spacing" />
      : null;

    return (
      <div className="well">
        <h4 className="well__header text--emphasis">
          Search Query
          {errorIcon}
        </h4>
        <div className="well__content">
          {errors}
          <SearchQueryKeywords keywords={this.props.query.keywords} />
          <SearchQueryFields fields={this.props.query.fields} />
        </div>
      </div>
    );
  }
}
