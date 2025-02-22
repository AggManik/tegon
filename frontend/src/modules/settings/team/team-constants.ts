/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { Overview } from './overview';
import { Workflow } from './workflow';

export const SECTION_COMPONENTS = {
  overview: Overview,
  workflow: Workflow,
};

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type SECTION_COMPONENTS_KEYS = StringKeys<typeof SECTION_COMPONENTS>;
