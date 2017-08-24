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

/** Privates helper methods for classes that need to cancel promises. */
export class PromiseID {
  protected promiseID: symbol = Symbol();

  /**
   * Resets the current promise ID.
   * @returns {symbol} New promise ID.
   */
  protected resetPromiseID = (): symbol => {
    const promiseID = Symbol();

    this.promiseID = promiseID;

    return promiseID;
  };

  /**
   * Determines if the given promise ID matches the latest promise ID.
   * @param {symbol} promiseID
   * @returns {boolean}
   */
  protected isValidPromiseID = (promiseID: symbol): boolean => {
    return this.promiseID === promiseID;
  };
}
