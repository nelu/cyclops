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
import {
  SubtleSelect,
  SelectOption,
} from '../../../components/SubtleSelect';
import { User } from '../../../api/users/types';
import { getUserFullName } from '../../../api/users/utils';
import { CONFIG } from '../../../config';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for the AlertDetailUserSelect component. */
interface Props {
  /** Alert to select a new user for. */
  currentUser: User | null;
  /** List of users to pick from. */
  users: User[];
  /** Picks the new user. */
  selectUser(userId: number | null): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Selects a new assigned user for an alerts.
 */
export class AlertDetailUserSelect extends React.Component<Props, {}> {
  /**
   * Option that unassigns the alert from anyone.
   * @type {SelectOption}
   */
  public static UNASSIGN_OPTION: SelectOption = {
    name: 'None',
    value: 0,
  };

  /**
   * Handles selecting a new user for an alert.
   * @param userId
   */
  public handleSelect = (userId: string): void => {
    const parsedUserId = parseInt(userId, 10);

    if (parsedUserId > 0) { this.props.selectUser(parsedUserId); }
    else { this.props.selectUser(null); }
  };

  public render(): JSX.Element {
    const currentUserName = this.props.currentUser
      ? getUserFullName(this.props.currentUser)
      : 'None';

    // Hide user select if the current user isn't staff
    if (!CONFIG.CURRENT_USER.is_staff) {
      return (<span className="badge">{currentUserName}</span>);
    }

    const currentUserId = this.props.currentUser
      ? this.props.currentUser.id
      : 0;
    const userOptions = this.props.users.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      value: user.id,
    }));
    const options = [AlertDetailUserSelect.UNASSIGN_OPTION].concat(userOptions);

    return (
      <SubtleSelect
        options={options}
        currentValue={currentUserId}
        onSelect={this.handleSelect}
      >
        <span className="badge">
          {currentUserName}
        </span>
      </SubtleSelect>
    );
  };
}
