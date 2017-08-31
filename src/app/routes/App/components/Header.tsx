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
import {
  Link,
  IndexLink,
} from 'react-router';

// Local
import { getConfig } from '~/config';
import { MonitorStatusContainer } from '../containers/MonitorStatusContainer';
import { LogoutModal } from './LogoutModal';
import { FlexBox } from '~/components/FlexBox';
import { FlexItem } from '~/components/FlexItem';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the Header component. */
interface HeaderProps {
  /** Current url location. */
  location: string;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Header component that controls page navigation and site-wide information.
 * @param {HeaderProps} props
 */
export class Header extends React.Component<HeaderProps, {}> {
  public render(): JSX.Element {
    const adminLink = getConfig().ADMIN_URL
      ? (
        <FlexItem shrink={true}>
          <a
            id="admin-link"
            className="header__link"
            target="_blank"
            href={getConfig().ADMIN_URL}
          >
            Admin
          </a>
        </FlexItem>
      ) : null;

    return (
      <nav className="flex-box header">
        <div className="flex-box flex-box--align-center flex--shrink">
          <img className="header__logo" src={getConfig().CYPHON_LOGO_URL} alt="Cyphon"/>
        </div>

        <FlexBox>
          <FlexItem shrink={true}>
            <IndexLink
              className="header__link"
              to="/"
              activeClassName="header__link--active"
            >
              Dashboard
            </IndexLink>
          </FlexItem>
          <FlexItem shrink={true}>
            <Link
              className="header__link"
              to="/alerts/"
              activeClassName="header__link--active"
            >
              Alerts
            </Link>
          </FlexItem>
          <FlexItem shrink={true}>
            <Link
              className="header__link"
              to="/search/"
              activeClassName="header__link--active"
            >
              Search
            </Link>
          </FlexItem>
        </FlexBox>
        <FlexBox shrink={true}>
          {adminLink}
          <MonitorStatusContainer />
          <LogoutModal />
        </FlexBox>
      </nav>
    );
  }
}
