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
import {
  Container,
  ContainerFlat,
  ContainerNested,
  Taste,
} from '../containers/types';
import {
  ContextFilter,
  ContextFlat,
  ContextNested,
} from '~/services/contexts/types';
import {
  NormalizedEntity,
  NormalizedList,
} from '~/types/normalizr';
import { Field } from '~/services/cyphon/types';

/** Distillery object returned from the Cyphon API. */
export interface Distillery {
  /** Identifier of the distillery object. */
  id: number;
  /** Name of the distillery. */
  name: string;
  /** Container associated with the distillery. */
  container: Container | number;
  /** Contexts associated with the distillery. */
  contexts: ContextNested[] | number[];
  url: string;
}

/** Distillery object with associated objects nested on the object. */
export interface DistilleryNested extends Distillery {
  collection: number;
  /** Contaienr object associated with the distillery. */
  container: ContainerNested;
  /** Context objects associated with the distillery. */
  contexts: ContextNested[];
}

export interface DistilleryFlat extends Distillery {
  container: number;
  contexts: number[];
}

/** Distillery object with associated objects represented with their ID's. */
export interface DistilleryMinimal {
  id: number;
  name: string;
  url: string;
}

/** Entities in a normalized distillery or list of distilleries. */
interface DistilleryEntities {
  containers?: NormalizedEntity<ContainerFlat>;
  contextFilters?: NormalizedEntity<ContextFilter>;
  contexts?: NormalizedEntity<ContextFlat>;
  distilleries?: NormalizedEntity<DistilleryFlat>;
  fields?: NormalizedEntity<Field>;
  tastes?: NormalizedEntity<Taste>;
}

/** List of normalized distilleries. */
export type NormalizedDistilleryList = NormalizedList<number, DistilleryEntities>;
