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

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchAlertResult component. */
interface Props {
  alert: AlertDetail;
  openAlert(id: number): void;
}

interface State {
  isOpen: boolean;
  canOpen: boolean;
}

const DATA = {
  "id": 1,
  "first_name": "Stanfield",
  "last_name": "Lambot",
  "email": "slambot0@google.co.uk",
  "gender": "Male",
  "ip_address": "144.174.228.171",
  "WOOOO": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
  "something": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  "neh": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
  "wahoo": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
  "stuff": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis."
};

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

  public getContainerElement = (): HTMLElement | null => {
    return document.getElementById(this.id);
  };

  public getContainerElementHeight = (): number => {
    const element = this.getContainerElement();

    if (element) { return element.clientHeight; }

    return 0;
  };

  public toggleVisibility = (): void => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public componentDidMount() {
    const height = this.getContainerElementHeight();

    this.setState({ canOpen: height >= SearchAlertResult.MAX_HEIGHT });
  }

  public render() {
    const comments = this.props.alert.comments.map((comment) => (
      <AlertDetailComment comment={comment}/>
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
    const contentStyle = {
      'max-height': this.state.isOpen
        ? 'none'
        : `${SearchAlertResult.MAX_HEIGHT}px`,
    };

    return (
      <div className="search-alert-result__container">
        <table>
          <AlertListItem alert={this.props.alert} selectAlert={this.props.openAlert} />
        </table>
        <div
          id={this.id}
          className="flex-box search-alert-result__content"
          style={contentStyle}
        >
          <div className="flex-item content search-alert-result__data">
            <JSONFormatter json={DATA} />
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
          <div className="search-alert-result__gradient" />
        </div>
        <button
          onClick={this.toggleVisibility}
          className="btn-basic btn-block text-center"
        >
          <i className={openButtonIconClasses} />
        </button>
      </div>
    );
  }
}
