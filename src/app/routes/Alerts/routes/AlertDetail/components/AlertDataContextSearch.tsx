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
import { Button, Pagination } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local
import {
  NormalizedContextList,
  ContextSearchParams,
} from '../../../../../services/contexts/types';
import { AlertDataContextSelect } from './AlertDataContextSelect';
import { JSONFormatter } from '../../../../../components/JSONFormatter';
import { AlertDataContextDetail } from './AlertDataContextDetail';
import { SpacedSection } from '../../../../../components/SpacedSection';
import { SubTitle } from '../../../../../components/SubTitle';
import { TextInput } from '../../../../../components/TextInput';
import { Result } from '../../../../../types/result';
import { getResultPaginationRange } from '../../../../../utils/getResultPaginationRange';
import { denormalizeContext } from '../../../../../services/contexts/utils';
import {
  StateToProps,
  DispatchToProps,
} from '../../../../../types/redux';
import {
  searchAlertDataContext,
  selectContext,
} from '../../../../AlertDetail/actions/AlertDataContextSearchActions';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDataContextSearch component that are values. */
interface ValueProps {
  /** Currently selected context ID. */
  selectedContext: number | null;
  /** Current page of context search results. */
  page: number | null;
  /** Page size of context search results. */
  pageSize: number;
  /** If context search results are loading. */
  loading: boolean;
  /** List of context search results. */
  results: Result[];
  /** Total number of context search results. */
  resultCount: number | null;
}

/** Properties of the AlertDataContextSearch compoenent that are functions. */
interface FunctionProps {
  /**
   * Selects the context to search through.
   * @param contextId ID of the context to search through.
   */
  selectContext(contextId: number): any;
  /**
   * Searches the selected context.
   * @param contextId ID of the context to search through.
   * @param params Parameters to search with.
   */
  searchContext(contextId: number, params: ContextSearchParams): any;
}

/** Properties of the AlertDataContextSearch component passed from the parent. */
interface OwnProps {
  /** ID of the alert stores. */
  resultId: string;
  /** List of contexts to pick from. */
  contexts: NormalizedContextList;
}

type Props = ValueProps & FunctionProps & OwnProps;

/** Internal state of the AlertDataContextSearch component. */
interface State {
  /** Current keyword to search a context with. */
  keyword: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Allows the user to pick and search through a context related to
 * a piece of alert stores.
 */
export class AlertDataContextSearch extends React.Component<Props, State> {
  /**
   * How many levels the returned json objects will be opened.
   * @type {number}
   */
  public static JSON_OPEN_LEVEL = 10;

  constructor(props: Props) {
    super(props);

    this.state = { keyword: '' };
  }

  /**
   * Performs the initial search.
   */
  public performInitialSearch = (): void => {
    this.performSearch(1);
  };

  /**
   * Performs a context search with the currently selected search parameters.
   */
  public performSearch = (page: number): void => {
    if (this.props.selectedContext) {
      const params = {
        id: this.props.resultId,
        keyword: this.state.keyword,
        page,
        page_size: this.props.pageSize,
      };

      this.props.searchContext(this.props.selectedContext, params);
    }
  };

  /**
   * Handles a page change from the bootstrap Pagination element.
   * @param page Page to change to.
   */
  public handlePageChange = (page: any): void => {
    this.performSearch(page);
  };

  /**
   * Handles the change of the keyword.
   * @param keyword
   */
  public handleKeywordChange = (keyword: string): void => {
    this.setState({ keyword });
  };

  public render(): JSX.Element {
    const paginationRange = this.props.page && this.props.resultCount
      ? getResultPaginationRange(
        this.props.page,
        this.props.pageSize,
        this.props.resultCount,
      ) : null;
    const resultList = (
      this.props.results &&
      this.props.results.length &&
      paginationRange
    ) ? this.props.results.map((result, index) => (
      <div key={result._id} className="result-context-search__result flex-box">
        <div className="result-context-search__result-index flex-item flex--shrink">
          {paginationRange.start + index}
        </div>
        <div className="result-context-search__result-data flex-item">
          <JSONFormatter json={result} open={10} />
        </div>
      </div>
    )) : (
      <h4 className="text-center">No Results</h4>
    );
    const contextObject = this.props.selectedContext
      ? denormalizeContext(this.props.selectedContext, this.props.contexts)
      : null;
    const contextDetail = contextObject
      ? <AlertDataContextDetail context={contextObject}/>
      : null;
    const keywordChange = this.props.selectedContext
      ? (
        <div>
          <TextInput
            updateText={this.handleKeywordChange}
            placeholder="Keyword"
          />
        </div>
      ) : null;
    const paginationElement =
      this.props.resultCount as number > this.props.pageSize &&
      this.props.page
        ? (
        <div className="result-context-search__pagination">
          <Pagination
            items={Math.ceil(this.props.resultCount as number / this.props.pageSize)}
            activePage={this.props.page}
            onSelect={this.handlePageChange}
            maxButtons={6}
            next="Next"
            prev="Prev"
            first="First"
            last="Last"
          />
        </div>
      ) : null;
    const paginationRangeElement = paginationRange
      ? (
        <span>
          Showing {paginationRange.start} - {paginationRange.end} of {this.props.resultCount}
        </span>
      ) : null;
    const searchButtonText = this.props.loading
      ?  <i className="fa fa-spinner fa-spin" />
      : 'Search';

    return (
      <div className="flex-box">
        <div className="result-modal__sidebar result-context-search__sidebar">
          <SpacedSection>
            <SubTitle>Context</SubTitle>
            <AlertDataContextSelect
              contexts={this.props.contexts}
              selectedContext={this.props.selectedContext}
              selectContext={selectContext}
            />

            {keywordChange}

            <Button
              block={true}
              bsStyle="default"
              onClick={this.performInitialSearch}
              className="result-context-search__button"
              disabled={!this.props.selectedContext || this.props.loading}
            >
              {searchButtonText}
            </Button>
          </SpacedSection>

          {contextDetail}
        </div>

        <div className="flex-item">
          <div className="result-context-search__header">
            {paginationRangeElement}
          </div>
          <div className="result-context-search__result-list">
            {resultList}
          </div>
          {paginationElement}
        </div>
      </div>
    );
  }
}

// --------------------------------------------------------------------------
// Container
// --------------------------------------------------------------------------

/**
 * Maps the redux state to AlertDetail component properties.
 * @param state Redux state.
 * @param ownProps Properties passed AlertDetailContainer.
 */
const mapStateToProps: StateToProps<ValueProps, OwnProps> = (
  state,
  ownProps,
) => ({
  selectedContext: state.routes.AlertDetail.AlertDataContextSearch.selectedContext,
  page: state.routes.AlertDetail.AlertDataContextSearch.page,
  pageSize: state.routes.AlertDetail.AlertDataContextSearch.pageSize,
  loading: state.routes.AlertDetail.AlertDataContextSearch.loading,
  results: state.routes.AlertDetail.AlertDataContextSearch.results,
  resultCount: state.routes.AlertDetail.AlertDataContextSearch.resultCount,
  resultId: ownProps.resultId,
  contexts: ownProps.contexts,
});

/**
 * Maps redux dispatch functions to AlertDetail component properties.
 * @param dispatch Dispatch function from the redux store.
 */
const mapDispatchToProps: DispatchToProps<FunctionProps, undefined> = (
  dispatch,
) => ({
  searchContext: bindActionCreators(searchAlertDataContext, dispatch),
  selectContext: bindActionCreators(selectContext, dispatch),
});

/**
 * Container component created from the Alert Detail component.
 */
export const AlertDataContextSearchContainer = connect<
  ValueProps,
  FunctionProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(AlertDataContextSearch);
