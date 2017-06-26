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
import { getConfig } from '~/config';
import { Collapsible } from '~/components/Collapsible';
import { UserAutocomplete } from '~/services/users/components/UserAutocomplete';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/**
 * Properties of the AlertParamsUserSelect component.
 */
interface Props {
  /** Current list of all users. */
  users: User[];
  /** Currently selected user. */
  selected?: number;
  /**
   * Selects a new user to filter alerts with..
   * @param user ID of the user to filter alerts with.
   */
  select(user?: number): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a select element that allows the user to select a new user
 * to filter alerts by.
 */
export class AlertParamsUserSelect extends React.Component<Props, {}> {
  /**
   * Handle the event emitted whenever the select value changes by
   * running the passed in select function.
   * @param user
   */
  public onSelect = (user: User): void => {
    this.props.select(user.id);
  };

  /** Selects the current user to filter alerts by. */
  public selectCurrentUser = (): void => {
    this.props.select(getConfig().CURRENT_USER.id);
  };

  /** Clears the currently selected user. */
  public clearSelection = (): void => {
    this.props.select(undefined);
  };

  public render(): JSX.Element {
    return (
      <div className="alert-list-params__spacer ">
        <Collapsible
          title="Assigned"
          action={this.clearSelection}
          actionName="Clear"
        >
          <div className="form-group alert-list-params__group">
            <UserAutocomplete
              users={this.props.users}
              selected={this.props.selected}
              onSelect={this.onSelect}
            />
            <button
              className="btn-basic"
              onClick={this.selectCurrentUser}
            >
              Assigned to me
            </button>
          </div>
        </Collapsible>
      </div>
    );
  }
}
