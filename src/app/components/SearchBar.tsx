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

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the SearchBar component. */
interface Props {
  initialValue?: string;
  placeholder?: string;
  onSubmit(value: string): any;
}

interface State {
  value: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Large text input that triggers a change when hitting submit.
 */
export class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { value: this.props.initialValue || '' };
  }
  /**
   * Handles the text change from the input element.
   * @param event
   */
  public handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;

    this.setState({ value });
  };

  /**
   * Submits the current value when the Enter key is pressed.
   * @param event
   */
  public handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') { this.submit(); }
  };

  /** Sends current text value to onSubmit function. */
  public submit = (): void => {
    this.props.onSubmit(this.state.value);
  };

  public render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <span>
          <button onClick={this.submit}>Submit</button>
        </span>
      </div>
    );
  }
}
