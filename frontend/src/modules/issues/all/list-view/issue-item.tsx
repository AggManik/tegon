/** Copyright (c) 2024, Tegon, all rights reserved. **/
import dayjs from 'dayjs';

import { IssueType } from 'common/types/issue';

import { useCurrentTeam } from 'hooks/teams/use-current-team';

import { IssueAssigneeDropdown } from './issue-assignee-dropdown';
import { IssueStatusDropdown } from './issue-status-dropdown';

interface IssueItemProps {
  issue: IssueType;
}

export function IssueItem({ issue }: IssueItemProps) {
  const team = useCurrentTeam();

  return (
    <div className="pl-9 p-3 flex justify-between text-sm hover:bg-slate-100/50 dark:hover:bg-slate-900/50 border-b-[0.5px]">
      <div className="flex items-center">
        <div className="pr-3 text-muted-foreground min-w-[60px]">{`${team.identifier}-${issue.number}`}</div>
        <div className="pr-3">
          <IssueStatusDropdown value={issue.stateId} />
        </div>
        <div className="font-medium max-w-[500px] ">
          <div className="truncate">{issue.title}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-muted-foreground text-sm">
          {dayjs(issue.createdAt).format('DD MMM')}
        </div>
        <IssueAssigneeDropdown value={issue.assigneeId} />
      </div>
    </div>
  );
}
