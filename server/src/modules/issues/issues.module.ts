/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { IssueHistory } from '@@generated/issueHistory/entities';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import { IssueHistoryModule } from 'modules/issue-history/issue-history.module';

import { IssuesController } from './issues.controller';
import IssuesService from './issues.service';

@Module({
  imports: [PrismaModule, HttpModule, IssueHistoryModule],
  controllers: [IssuesController],
  providers: [IssuesService, PrismaService, IssueHistory],
  exports: [IssuesService],
})
export class IssuesModule {}
