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
import { ContextNested } from '../../../services/contexts/types';
import { SpacedList } from '../../../components/SpacedList';
import { SpacedSection } from '../../../components/SpacedSection';
import { SubTitle } from '../../../components/SubTitle';
import { AlertDataContextFilters } from './AlertDataContextFilters';
import { shortenDistilleryName } from '../../../services/distilleries/utils';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the AlertDataContextDetail component. */
interface Props {
  /** Context to display detailed information on. */
  context: ContextNested;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays information about a selected context related to a piece of
 * alert data.
 */
export class AlertDataContextDetail extends React.Component<Props, {}> {
  public render() {
    return (
      <div>
        <SpacedSection>
          <SubTitle>Sources</SubTitle>
          <SpacedList>
            <dt>Primary Source:</dt>
            <dd>{shortenDistilleryName(this.props.context.primary_distillery.name)}</dd>

            <dt>Related Source:</dt>
            <dd>{shortenDistilleryName(this.props.context.related_distillery.name)}</dd>
          </SpacedList>
        </SpacedSection>

        <SpacedSection>
          <SubTitle>Time Frame</SubTitle>
          <SpacedList>
            <dt>Before:</dt>
            <dd>
              {this.props.context.before_time_interval}
              {this.props.context.before_time_unit}
            </dd>

            <dt>After:</dt>
            <dd>
              {this.props.context.after_time_interval}
              {this.props.context.after_time_unit}
            </dd>
          </SpacedList>
        </SpacedSection>

        <SpacedSection>
          <SubTitle>Field Filters</SubTitle>

          <AlertDataContextFilters
            filters={this.props.context.filters}
            filterLogic={this.props.context.filter_logic}
          />
        </SpacedSection>
      </div>
    );
  }
}