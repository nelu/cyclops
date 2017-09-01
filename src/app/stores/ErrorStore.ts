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
import {
  action,
  observable,
} from 'mobx';
import { StoredError } from '~/services/errors/types';
import { RootStore } from '~/stores';

export class ErrorStore {
  @observable public errors: StoredError[] = [];
  @observable public viewed: number = 0;
  private root: RootStore;

  constructor(root: RootStore) {
    this.root = root;
  }

  @action
  public add = (error: StoredError): void => {
    this.errors.push(error);
  };

  @action
  public view = (index: number): void => {
    this.viewed = index;
  };

  @action
  public clear = (): void => {
    this.errors = [];
  }
}
