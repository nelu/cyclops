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
import { User } from '~/services/users/types';
import { Autocomplete } from '~/components/Autocomplete';
import { findByID } from '~/utils/arrayUtils';
import { getUserFullName } from '~/services/users/utils/getUserFullName';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the UserAutocomplete component. */
interface Props {
  /** Users to display. */
  users: User[];
  /** ID of the currently selected user. */
  selected?: number;
  /**
   * Function that runs whenever a user is selected.
   * @param user Selected user.
   */
  onSelect?(user: User): void;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays an autocomplete that selects users.
 */
export class UserAutocomplete extends React.Component<Props, {}> {
  /**
   * Returns the currently selected user from the list of users.
   * @returns {User | undefined}
   */
  public getSelectedUser = (): User | undefined => {
    return this.props.selected
      ? findByID(this.props.selected, this.props.users)
      : undefined;
  };

  /**
   * Returns the value to use as the Autocomplete value property.
   * @returns {string}
   */
  public getAutocompleteValue = (): string => {
    const user = this.getSelectedUser();

    return user ? getUserFullName(user) : '';
  };

  public render() {
    return (
      <Autocomplete
        items={this.props.users}
        getValue={getUserFullName}
        value={this.getAutocompleteValue()}
        onSelect={this.props.onSelect}
        placeholder="Select User"
      />
    );
  }
}
