/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { RiAccountCircleLine } from '@remixicon/react';
import * as React from 'react';

import { IssueAssigneeDropdownContent } from 'modules/issues/components';

import { cn } from 'common/lib/utils';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  getInitials,
} from 'components/ui/avatar';
import { Button } from 'components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { useUsersData } from 'hooks/users/use-users-data';

import { User } from 'store/user-context';

interface IssueAssigneeDropdownProps {
  value?: string;
  onChange?: (assigneeId: string) => void;
}

export function IssueAssigneeDropdown({
  value,
  onChange,
}: IssueAssigneeDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const { usersData, isLoading } = useUsersData();

  function getUserData(userId: string) {
    return usersData.find((userData: User) => userData.id === userId);
  }

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="xs"
            aria-expanded={open}
            className={cn(
              'flex items-center justify-between !bg-transparent hover:bg-transparent p-0 border-0 text-xs font-normal focus-visible:ring-1 focus-visible:border-primary text-muted-foreground',
              value && 'text-foreground',
            )}
          >
            {value ? (
              <>
                <Avatar className="h-[20px] w-[25px]">
                  <AvatarImage />
                  <AvatarFallback className="bg-teal-500 dark:bg-teal-900 text-[0.6rem] rounded-sm">
                    {getInitials(getUserData(value).fullname)}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <RiAccountCircleLine
                  size={18}
                  className="mr-1 text-muted-foreground"
                />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <IssueAssigneeDropdownContent
            onClose={() => setOpen(false)}
            usersData={usersData}
            onChange={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
