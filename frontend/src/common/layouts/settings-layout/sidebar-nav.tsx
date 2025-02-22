/** Copyright (c) 2024, Tegon, all rights reserved. **/
'use client';

import {
  RiAccountCircleFill,
  RiArrowLeftSLine,
  RiBuilding4Fill,
} from '@remixicon/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from 'common/lib/utils';

import { Button, buttonVariants } from 'components/ui/button';

import { ACCOUNT_LINKS, WORKSPACE_LINKS } from './settings-layout-constants';
import { TeamSettingsList } from './team-settings-list';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const { query, replace } = useRouter();
  const {
    workspaceSlug,
    teamIdentifier,
    settingsSection = WORKSPACE_LINKS[0].href,
  } = query;

  return (
    <nav className={cn('flex flex-col', className)} {...props}>
      <Button
        variant="ghost"
        size="xl"
        onClick={() => {
          replace(`/${query.workspaceSlug}`);
        }}
        className=" group px-3 py-4 text-lg bg-transparent hover:bg-transparent dark:hover:bg-transparent flex justify-start"
      >
        <RiArrowLeftSLine
          className="mr-4 text-slate-400 dark:text-slate-600 dark:group-hover:text-slate-500 group-hover:text-black"
          size={20}
        />
        Settings
      </Button>

      <div className="px-4 py-3">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-center mb-1">
            <RiBuilding4Fill size={18} className="text-muted-foreground" />
            <div className="text-muted-foreground text-sm ml-4">Workspace</div>
          </div>

          <div className="pl-7 flex flex-col w-full">
            {WORKSPACE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${workspaceSlug}/settings/${item.href}`}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  !teamIdentifier &&
                    settingsSection === item.href &&
                    'bg-slate-100 dark:bg-slate-800',
                  'justify-start text-sm w-full px-2 text-slate-700 dark:text-slate-300 mt-1',
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-center mb-1">
            <RiAccountCircleFill size={18} className="text-muted-foreground" />
            <div className="text-muted-foreground text-sm ml-4">My Account</div>
          </div>

          <div className="pl-7 flex flex-col w-full">
            {ACCOUNT_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${workspaceSlug}/settings/${item.href}`}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'justify-start text-sm w-full px-2 text-slate-700 dark:text-slate-300 mt-1',
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <TeamSettingsList />
    </nav>
  );
}
