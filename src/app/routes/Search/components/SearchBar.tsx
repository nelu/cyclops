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
import { NormalizedDistilleryList } from '~/services/distilleries/types';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchBar component. */
interface Props {
  onSubmit(query: string): void;
}

interface State {
  query: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 *
 */
export class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { query: '' };
  }

  public onChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    this.setState({ query: event.currentTarget.value });
  };

  public submitQuery = () => {
    this.props.onSubmit(this.state.query);
  };

  public onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') { this.submitQuery(); }
  };

  public onSubmit = () => {
    this.submitQuery();
  };

  public render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
        <span>
          <button onClick={this.onSubmit}>Submit</button>
        </span>
      </div>
    );
  }
}
