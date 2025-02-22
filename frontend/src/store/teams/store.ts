/* eslint-disable dot-location */
/** Copyright (c) 2024, Tegon, all rights reserved. **/
import { IAnyStateTreeNode, Instance, types } from 'mobx-state-tree';

import { TeamType } from 'common/types/team';

import { tegonDatabase } from 'store/database';

import { Team, modelName } from './models';

export const TeamsStore: IAnyStateTreeNode = types
  .model({
    teams: types.array(Team),
    lastSequenceId: types.union(types.undefined, types.number),
  })
  .actions((self) => ({
    update(team: TeamType, id: string) {
      const indexToUpdate = self.teams.findIndex((obj) => obj.id === id);

      if (indexToUpdate !== -1) {
        // Update the object at the found index with the new data
        self.teams[indexToUpdate] = {
          ...self.teams[indexToUpdate],
          ...team,
        };
      } else {
        self.teams.push(team);
      }
    },
    delete(id: string) {
      const indexToDelete = self.teams.findIndex((obj) => obj.id === id);

      if (indexToDelete !== -1) {
        self.teams.splice(indexToDelete, 1);
      }
    },
    updateLastSequenceId(lastSequenceId: number) {
      self.lastSequenceId = lastSequenceId;
    },
  }));

export type TeamsStoreType = Instance<typeof TeamsStore>;

export let teamsStore: TeamsStoreType;

export async function initialiseTeamsStore(workspaceId: string) {
  let _store = teamsStore;
  if (!_store) {
    const teams = await tegonDatabase.teams
      .where({
        workspaceId,
      })
      .toArray();
    const lastSequenceData = await tegonDatabase.sequences.get({
      id: modelName,
    });
    _store = TeamsStore.create({
      teams,
      lastSequenceId: lastSequenceData?.lastSequenceId,
    });
  }
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
  // if (snapshot) {
  //   applySnapshot(_store, snapshot);
  // }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }
  // Create the store once in the client
  if (!teamsStore) {
    teamsStore = _store;
  }

  return teamsStore;
}
