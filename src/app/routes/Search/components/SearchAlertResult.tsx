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
import { AlertDetail } from '~/services/alerts/types';
import { JSONFormatter } from '~/components/JSONFormatter';
import { AlertDetailComment } from '~/routes/AlertDetail/components/AlertDetailComment';
import { AlertListItem } from '~/routes/AlertList/components/AlertListItem';
import { CollapsibleHeader } from '~/components/CollapsibleHeader';
import { getOutcomeDisplayName } from '~/services/alerts/utils/getOutcomeDisplayName';
import { createRandomId } from '~/utils/stringUtils';
import { orderKeys } from '~/utils/objectUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchAlertResult component. */
interface Props {
  alert: AlertDetail;
  onClick(id: number): void;
}

interface State {
  isOpen: boolean;
  canOpen: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Information about an alert returned from a search query.
 */
export class SearchAlertResult extends React.Component<Props, State> {
  public static MAX_HEIGHT: number = 400;

  public id: string;

  constructor(props: Props) {
    super(props);

    this.id = createRandomId();

    this.state = {
      isOpen: false,
      canOpen: false,
    };
  }

  public toggleVisibility = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public render() {
    const comments = this.props.alert.comments.map((comment) => (
      <AlertDetailComment key={comment.id} comment={comment}/>
    ));
    const outcome = (
      getOutcomeDisplayName(this.props.alert.outcome) ||
      <i>No outcome selected</i>
    );
    const notes = this.props.alert.notes || <i>No analysis written</i>;
    const gradient = this.state.isOpen || !this.state.canOpen
      ? null
      : <div className="search-alert-result__gradient" />;
    const openButtonIconClasses = classnames('fa', 'fa-lg', 'text--emphasis', {
      'fa-caret-down': !this.state.isOpen,
      'fa-caret-up': this.state.isOpen,
    });
    const openButton = this.state.canOpen
      ? (
        <button
          onClick={this.toggleVisibility}
          className="btn-basic btn-block text-center"
        >
          <i className={openButtonIconClasses} />
        </button>
      ) : null;

    return (
      <div className="search-alert-result__container">
        <table>
          <AlertListItem
            alert={this.props.alert}
            onClick={this.props.onClick}
            isActive={false}
          />
        </table>
        <div
          id={this.id}
          className="flex-box search-alert-result__content"
        >
          <div className="flex-item content search-alert-result__data">
            <JSONFormatter json={this.props.alert.data} />
          </div>
          <div className="flex-item flex--shrink content search-alert-result__details">
            <h3 className="sub-title">Outcome</h3>
            <div className="well">
              <div className="well__header">{outcome}</div>
              <div className="well__content">{notes}</div>
            </div>

            <CollapsibleHeader
              title={`Comments ${this.props.alert.comments.length}`}
              open={!!this.props.alert.comments.length}
            >
              {comments}
            </CollapsibleHeader>
          </div>
        </div>
      </div>
    );
  }
}
