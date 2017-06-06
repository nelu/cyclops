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
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {
  LocationDescriptor,
  InjectedRouter,
} from 'react-router';

// Local

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

interface ValueProps {
  location: LocationDescriptor;
  router: InjectedRouter;
}
interface FunctionProps {
  /** Fetches all container objects for the page. */
  fetchContainers(): any;
}

/** Properties of the Search component. */
type Props = ValueProps & FunctionProps;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Root component of the Search page.
 */
export class Search extends React.Component<Props, {}> {
  public componentWillMount(): void {
    // this.props.fetchContainers();
  }

  public render() {
    return (
      <div className="flex-box">
        <div className="flex-box flex--shrink sidebar">
          <div className="flex-item">

          </div>
        </div>
        <div className="flex-box" />
      </div>
    );
  }
}
