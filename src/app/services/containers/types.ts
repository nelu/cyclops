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
import { Field } from '../cyphon/types';

/** Taste object from the Cyphon API. */
export interface Taste {
  /** Unique identifier. */
  id: number;
  /** Field of the associated container that contains author information. */
  author: string;
  /** Field of the associated container that contains title information. */
  title: string;
  /** ID of the associated container. */
  container: number;
  /** Field of the associated container that contains content information. */
  content: string;
  /** Field of the associated container that contains location information. */
  location: string;
  /** Format of the location information. */
  location_format: string;
  /** Field of the associated container that contains date information. */
  datetime: string;
  /**  */
  date_string: string;
  /** Format of the date information. */
  date_format: string;
  /** URI of this taste. */
  url: string;
}

/** Container object from the Cyphon API. */
export interface Container {
  /** Bottle associated with the container. */
  bottle: number;
  /** Identifier of the container. */
  id: number;
  /** Bottle and label fields combined together. */
  fields: Field[];
  /** Label associated with the container. */
  label: number | null;
  /** Name of the container. */
  name: string;
  /** URI of the container object. */
  url: string;
  /** Taste assocated with the container. */
  taste: number | Taste;
}

/** Container object with nested objects. */
export interface ContainerNested extends Container {
  /** Related taste object. */
  taste: Taste;
}

/** Container object with related objects represented by their ID's. */
export interface ContainerFlat extends Container {
  /** ID of the related taste object. */
  taste: number;
}
