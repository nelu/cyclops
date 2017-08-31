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
  Modal,
  Pagination,
} from 'react-bootstrap';
import { observer } from 'mobx-react';

// Local
import { ErrorPopupContent } from './ErrorPopupContent';
import { StoredError } from '../types';
import { Close } from '~/components/Close';


// --------------------------------------------------------------------------
// Interfaces/Types
// --------------------------------------------------------------------------

/** Properties of the ErrorPopup component that are values. */
interface Props {
  /** Array index of the currently viewed error. */
  viewed: number;
  /** List of all the current errors. */
  errors: StoredError[];
  /** Clears the current errors and dismisses the popup. */
  clear(): any;
  /** Views a new error in the current list of errors. */
  view(index: number): any;
}

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------

/**
 * Modal popup that displays all the current API errors when there are any.
 */
@observer
export class ErrorPopup extends React.Component<Props, {}> {
  /**
   * Clears all errors in the errors modal.
   */
  public clearErrors = (): void => {
    this.props.clear();
  };

  /**
   * View a new error in the current list of errors.
   * @param page The page of the new error to view.
   */
  public viewError = (page: any): void => {
    this.props.view(page - 1);
  };

  public render(): JSX.Element {
    const selectedError = this.props.errors[this.props.viewed] || undefined;
    const showModal = Boolean(this.props.errors.length);
    const paginationElement = this.props.errors.length > 1
      ? (
        <Pagination
          items={this.props.errors.length}
          activePage={this.props.viewed + 1}
          className="error-modal__pagination"
          onSelect={this.viewError}
          maxButtons={3}
          next="Next"
          prev="Prev"
        />
      ) : null;
    const errorContent = selectedError
      ? <ErrorPopupContent error={selectedError}/>
      : (
        <div>
          <h4>No Error Selected</h4>
          <p>
            There is currently no error selected to view.
            Please select one or close this popup.
          </p>
        </div>
      );

    return (
      <Modal show={showModal} onHide={this.clearErrors}>
        <Modal.Body>
          <div className="pull-right">
            <Close close={this.clearErrors} />
          </div>
          {errorContent}
        </Modal.Body>
        <Modal.Footer className="error-modal__footer">
          {paginationElement}
          <button className="btn btn-default" onClick={this.clearErrors}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
