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
import { DistilleryNested } from '~/services/distilleries/types';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { ContainerNested } from '~/services/containers/types';
import { Field } from '~/services/cyphon/types';
import { SearchBar } from './SearchBar';
import { SearchContainer } from './SearchContainer';
import { SearchField } from '~/routes/Search/components/SearchField';
import { SearchDistillery } from '~/routes/Search/components/SearchCollection';
import { SearchQuery } from '~/routes/Search/components/SearchQuery';
import { SearchQuery as SearchQueryInterface } from '~/services/search/types';
import { Loading } from '~/components/Loading';
import { SearchQueryView } from '~/store/searchQuery';
import { SearchViewChangeButton } from '~/routes/Search/components/SearchViewChangeButton';

// Local

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface Props {
  /** List of all the current containers in Cyphon. */
  containers: ContainerNested[];
  /** List of all the current fields in Cyphon. */
  fields: Field[];
  /** List of all the current distilleries in Cyphon. */
  distilleries: DistilleryNested[];
  /** Object representation of the current string query. */
  query?: SearchQueryInterface;
  alertResultCount: number;
  resultCount: number;
  view: SearchQueryView;
  /** If more results are currently being loaded. */
  isLoading: boolean;
  /** If the current search query string is valid. */
  isQueryValid: boolean;
  changeView(view: SearchQueryView): any;
  changeQuery(query: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the SearchQueryStore page.
 */
export class SearchView extends React.Component<Props> {
  public render() {
    const containers = this.props.containers.map((container) => (
      <SearchContainer
        container={container}
        open={false}
      />
    ));
    const fields = this.props.fields.map((field) => (
      <SearchField field={field} />
    ));
    const distilleries = this.props.distilleries.map((distillery) => (
      <SearchDistillery distillery={distillery}/>
    ));
    const query = this.props.query
      ? <SearchQuery query={this.props.query} valid={this.props.isQueryValid} />
      : null;
    const loading = this.props.isLoading ? <Loading /> : null;

    return (
      <div className="flex-box flex-box--column">
        <div className="flex-box flex--shrink content banner">
          <SearchBar onSubmit={this.props.changeQuery} />
        </div>
        <div className="flex-box">
          <div className="flex-box flex--shrink sidebar sidebar--large">
            <div className="flex-item content">
              {query}
              <CollapsibleHeader title="Collections">
                {distilleries}
              </CollapsibleHeader>
              <CollapsibleHeader title="Fields">
                {fields}
              </CollapsibleHeader>
              <CollapsibleHeader title="Containers">
                {containers}
              </CollapsibleHeader>
            </div>
          </div>
          <div className="flex-box flex-box--column">
            <div className="flex-box flex--shrink">
              <div className="flex-item content" style={{ 'border-bottom': 'solid 1px #2a2b2e' }}>
                <span className="text--emphasis">
                  {this.props.alertResultCount + this.props.resultCount}
                </span>
                {' '}
                Results
                <SearchViewChangeButton
                  view={SearchQueryView.Alerts}
                  onClick={this.props.changeView}
                  activeView={this.props.view}
                >
                  {this.props.alertResultCount} Alerts
                </SearchViewChangeButton>>
                <SearchViewChangeButton
                  view={SearchQueryView.Data}
                  onClick={this.props.changeView}
                  activeView={this.props.view}
                >
                  {this.props.resultCount} Data
                </SearchViewChangeButton>>

              </div>
            </div>
            <div
              className="flex-box"
              style={{ 'border-top': 'solid 1px #3b3c41', 'border-bottom': 'solid 1px #2a2b2e'}}
            >
              {this.props.children}

            </div>
            {loading}
          </div>
        </div>
      </div>
    );
  }
}
