/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Loader } from 'components/ui/loader';

import { tegonDatabase } from 'store/database';
import { initializeIssuesStore } from 'store/issues';
import { initializeWorkflowsStore } from 'store/workflows';

export const TeamStoreProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState(true);

    const {
      query: { teamIdentifier },
    } = useRouter();

    React.useEffect(() => {
      if (teamIdentifier) {
        initTeamBasedStored();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamIdentifier]);

    // All data related to team
    const initTeamBasedStored = React.useCallback(async () => {
      setLoading(true);

      const teamData = await tegonDatabase.teams.get({
        identifier: teamIdentifier,
      });

      await initializeWorkflowsStore(teamData?.id);
      await initializeIssuesStore(teamData?.id);

      setLoading(false);
    }, [teamIdentifier]);

    if (loading) {
      return <Loader />;
    }

    return <>{children}</>;
  },
);
