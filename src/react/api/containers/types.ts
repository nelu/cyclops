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

// Local
import { Field } from '../types';

/** Container object from the Cyphon API. */
export interface Container {
  /** Bottle associated with the container. */
  bottle: number;
  /** Identifier of the container. */
  id: number;
  /** Bottle and label fields combined together. */
  fields: Field[];
  /** Label associated with the container. */
  label: number;
  /** Name of the container. */
  name: string;
  /** URI of the container object. */
  url: string;
  /** Taste assocated with the container. */
  taste: number;
}
