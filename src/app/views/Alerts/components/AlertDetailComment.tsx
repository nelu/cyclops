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
import { formatDate } from '../../../utils/formatDate';
import { CommentNested } from '../../../api/comments/types';
import { getUserFullName } from '../../../api/users/utils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDetailComment component. */
interface Props {
  /** Alert comment object to display. */
  comment: CommentNested;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a single alert comment.
 */
export class AlertDetailComment extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <div className="alert-comment">
        <div className="clearfix">
          <span className="badge">
            {getUserFullName(this.props.comment.user)}
          </span>
          <span className="pull-right text--muted">
            {formatDate(this.props.comment.created_date)}
          </span>
        </div>

        <p className="alert-comment__content">
          {this.props.comment.content}
        </p>
      </div>
    );
  }
}
