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
import { ListGroup } from 'react-bootstrap';

// Local
import { STATUS_OPTIONS_LIST } from '../constants';
import { AlertParamsStatusOption } from './AlertParamsStatusOption';
import { AlertStatusParam } from '~/services/alerts/types';
import { Collapsible } from '~/components/Collapsible';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/**
 * Properties for the AlertParamsStatusSelect component.
 */
interface Props {
  /** The currently selected Alert status. */
  currentStatus?: AlertStatusParam;
  /**
   * Selects a status to filter alerts with.
   * @param status Status to filter alerts with.
   */
  selectStatus(status?: AlertStatusParam): any;
}

/**
 * Displays a list group item showing a status choice that can be toggled to
 * be in or out of the current status.
 */
export class AlertParamsStatusSelect extends React.Component<Props, {}> {
  /** Clears any currently select statuses. */
  public clearStatus = (): void => {
    this.props.selectStatus(undefined);
  };

  public render(): JSX.Element {
    const statusOptions = STATUS_OPTIONS_LIST.map((status) => (
      <AlertParamsStatusOption
        status={status}
        currentStatus={this.props.currentStatus}
        selectStatus={this.props.selectStatus}
        key={String(status.value)}
      />
    ));

    return (
      <Collapsible
        title="Status"
        action={this.clearStatus}
        actionName="Clear"
        spaced={true}
      >
        <ListGroup>
          {statusOptions}
        </ListGroup>
      </Collapsible>
    );
  }
}
