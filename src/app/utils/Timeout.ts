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

/** Wrapper for timeout functions. */
export class Timeout {
  /** ID of the current timeout. */
  private timeoutID?: number;
  /** Milliseconds to timeout at. */
  private timeout: number;

  constructor(timeout: number) {
    this.timeout = timeout;
  }

  /**
   * Starts a timeout function.
   * @param {() => void} action
   */
  public start = (action: () => void): void => {
    if (this.isActive) { this.clear(); }

    window.setTimeout(() => {
      action();
      this.clear();
    }, this.timeout);
  };

  /**
   * If the timeout function is currently waiting to timeout.
   * @returns {boolean}
   */
  public get isActive(): boolean {
    return !!this.timeoutID;
  }

  /**
   * Clears the current timeout function if there is one.
   */
  public clear = (): void => {
    if (!this.timeoutID) { return; }

    window.clearTimeout(this.timeoutID);

    delete this.timeoutID;
  };
}
