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
import { SubtleTextArea } from '../../../components/SubtleTextArea';

// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties for AlertDetailAnalysis component. */
interface Props {
  /** Current alert notes. */
  notes: string;
  /** Function used to update the current alert notes. */
  updateNotes(notes: string): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Displays the current analysis of an alerts and allows the user to make
 * changes to it.
 */
export class AlertDetailAnalysis extends React.Component<Props, {}> {
  public render(): JSX.Element {
    return (
      <div className="spacing-section">
        <h3 className="sub-title">Analysis</h3>
        <SubtleTextArea
          text={this.props.notes}
          onSubmit={this.props.updateNotes}
        />
      </div>
    );
  }
}
