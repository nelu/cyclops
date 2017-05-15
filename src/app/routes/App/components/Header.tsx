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
import { Link, IndexLink } from 'react-router';
import * as classNames from 'classnames';

// Local
import { CONFIG } from '../../../config';
import { MonitorStatusContainer } from './MonitorStatus';
import { LogoutModal } from './LogoutModal';

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
    const alertNavClasses = classNames({
      active: new RegExp('^\/alerts\/').test(this.props.location),
    });
    const dashboardNavClasses = classNames({
      active: new RegExp('^\/?$').test(this.props.location),
    });

    return (
      <nav className="flex-box header">
        <div className="flex-box flex-box--align-center flex--shrink">
          <img className="header__logo" src={CONFIG.CYPHON_LOGO_URL} alt="Cyphon"/>
        </div>

        <div className="flex-box">
          <div className="flex-item flex--shrink">
            <IndexLink
              className="header__link"
              to="/"
              activeClassName="header__link--active"
            >
              Dashboard
            </IndexLink>
          </div>
          <div className="flex-item flex--shrink">
            <Link
              className="header__link"
              to="/alerts/"
              activeClassName="header__link--active"
            >
              Alerts
            </Link>
          </div>
        </div>
        {/*<ul className="nav navbar-nav">*/}
          {/*<li className={dashboardNavClasses}>*/}
            {/*<Link to="/">*/}
              {/*Dashboard*/}
            {/*</Link>*/}
          {/*</li>*/}
          {/*<li className={alertNavClasses}>*/}
            {/*<Link to="/alerts/">*/}
              {/*Alerts*/}
            {/*</Link>*/}
          {/*</li>*/}
        {/*</ul>*/}
        <div className="flex-box flex--shrink">
          <MonitorStatusContainer />
          <LogoutModal />
        </div>
        {/*<ul className="nav navbar-nav navbar-right">*/}
          {/*<li><MonitorStatusContainer /></li>*/}
          {/*/!*<LogoutModal />*!/*/}
        {/*</ul>*/}
      </nav>
    );
  }
}
