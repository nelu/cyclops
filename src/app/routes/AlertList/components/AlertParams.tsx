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
import { Popover, OverlayTrigger } from 'react-bootstrap';

// Local
import { DistilleryMinimal } from '~/services/distilleries/types';
import {
  AlertSearchParams,
  AlertTimeSearchParams,
  NormalizedCategoryList,
} from '~/services/alerts/types';
import { User } from '~/services/users/types';
import { AlertParamsLevelSelect } from './AlertParamsLevelSelect';
import { AlertParamsStatusSelect } from './AlertParamsStatusSelect';
import { AlertParamsUserSelect } from './AlertParamsUserSelect';
import { AlertParamsDistillerySelect } from './AlertParamsDistillerySelect';
import { AlertParamsDateCalendars } from './AlertParamsDateCalendars';
import { AlertParamsDateTimeSelect } from '~/routes/AlertList/components/AlertParamsDateTimeSelect';
import { AlertParamsCategorySelect } from '~/routes/AlertList/components/AlertParamsCategorySelect';
import { toggleArrayValue } from '~/utils/arrayUtils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertParams component. */
interface Props {
  /** List of all the distilleries that have alerts associated with them. */
  distilleries: DistilleryMinimal[];
  /** Currently selected alerts list search parameters. */
  params: AlertSearchParams;
  /** Current list of all users. */
  users: User[];
  /** Current list of categories. */
  categories: NormalizedCategoryList;
  /**
   * Changes the current alerts list search parameters.
   * @param params Parameters to change to.
   */
  changeParams(params: AlertSearchParams): any;
}

/** Internal state of the AlertParams component. */
interface State {
  /** If a panel that allows users to filter alerts by time is shown. */
  timePanelActive: boolean;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays a sidebar of possible alerts search parameters.
 */
export class AlertParams extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { timePanelActive: false };
  }

  /**
   * Selects the level to filter alerts by.
   * @param level
   */
  public selectLevel = (level: string | string[] | undefined) => {
    this.props.changeParams({ level });
  };

  /**
   * Selects the status to filter alerts by.
   * @param status
   */
  public selectStatus = (status: string | string[] | undefined) => {
    this.props.changeParams({ status });
  };

  /**
   * Selects the user to filter alerts by.
   * @param user
   */
  public selectUser = (user: number | undefined): void => {
    this.props.changeParams({ assigned_user: user });
  };

  /**
   * Selects the distillery to filter alerts by.
   * @param distillery
   */
  public toggleDistillery = (distillery: number): void => {
    this.props.changeParams({
      collection: toggleArrayValue(distillery, this.props.params.collection),
    });
  };

  /**
   * Selects the time to filter alerts by.
   * @param timeObject
   */
  public selectTime = (timeObject: AlertTimeSearchParams): void => {
    this.props.changeParams(timeObject);
  };

  /**
   * Selects the categorires to filter alerts with.
   * @param categories
   */
  public changeCategories = (categories?: number[]): void => {
    this.props.changeParams({ categories });
  };

  /**
   * Opens the time choice side panel.
   */
  public openTimePanel = (): void => {
    this.setState({ timePanelActive: true });
  };

  /**
   * Closes the time choice side panel.
   */
  public closeTimePanel = (): void => {
    this.setState({ timePanelActive: false });
  };

  public render(): JSX.Element {
    const timePanel = this.state.timePanelActive
      ? (
        <AlertParamsDateCalendars
          after={this.props.params.after}
          before={this.props.params.before}
          selectDate={this.selectTime}
          close={this.closeTimePanel}
        />
      ) : null;

    return (
      <section className="flex-box flex-box--column flex--shrink sidebar">
        <div className="alert-list-params__container flex-item">
          <AlertParamsUserSelect
            users={this.props.users}
            selected={this.props.params.assigned_user}
            select={this.selectUser}
          />

          <AlertParamsDateTimeSelect
            after={this.props.params.after}
            before={this.props.params.before}
            openTimePanel={this.openTimePanel}
            closeTimePanel={this.closeTimePanel}
            timePanelActive={this.state.timePanelActive}
            selectTime={this.selectTime}
          />

          <AlertParamsLevelSelect
            currentLevel={this.props.params.level}
            selectLevel={this.selectLevel}
          />

          <AlertParamsStatusSelect
            currentStatus={this.props.params.status}
            selectStatus={this.selectStatus}
          />

          <AlertParamsCategorySelect
            selected={this.props.params.categories}
            categories={this.props.categories}
            change={this.changeCategories}
          />

          <AlertParamsDistillerySelect
            selected={this.props.params.collection}
            distilleries={this.props.distilleries}
            onSelect={this.toggleDistillery}
            onRemove={this.toggleDistillery}
          />
        </div>
        {timePanel}
      </section>
    );
  }
}
