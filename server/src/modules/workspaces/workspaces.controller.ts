/** Copyright (c) 2024, Tegon, all rights reserved. **/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Workspace } from '@prisma/client';
import { SessionContainer } from 'supertokens-node/recipe/session';

import { AuthGuard } from 'modules/auth/auth.guard';
import { Session as SessionDecorator } from 'modules/auth/session.decorator';

import {
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  WorkspaceRequestIdBody,
} from './workspaces.interface';
import WorkspacesService from './workspaces.service';

@Controller({
  version: '1',
  path: 'workspaces',
})
@ApiTags('Workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Post()
  @UseGuards(new AuthGuard())
  async createWorkspace(
    @SessionDecorator() session: SessionContainer,
    @Body() workspaceData: CreateWorkspaceInput,
  ): Promise<Workspace> {
    const userId = session.getUserId();
    return await this.workspacesService.createWorkspace(userId, workspaceData);
  }

  @Get()
  @UseGuards(new AuthGuard())
  async getAllWorkspaces(
    @SessionDecorator() session: SessionContainer,
  ): Promise<Workspace[]> {
    const userId = session.getUserId();
    return await this.workspacesService.getAllWorkspaces(userId);
  }

  @Get(':workspaceId')
  @UseGuards(new AuthGuard())
  async getWorkspace(
    @Param()
    workspaceId: WorkspaceRequestIdBody,
  ): Promise<Workspace> {
    return await this.workspacesService.getWorkspace(workspaceId);
  }

  @Post(':workspaceId')
  @UseGuards(new AuthGuard())
  async updateWorkspace(
    @Param()
    workspaceId: WorkspaceRequestIdBody,
    @Body() workspaceData: UpdateWorkspaceInput,
  ): Promise<Workspace> {
    return await this.workspacesService.updateWorkspace(
      workspaceId,
      workspaceData,
    );
  }

  @Delete(':workspaceId')
  @UseGuards(new AuthGuard())
  async deleteWorkspace(
    @Param()
    workspaceId: WorkspaceRequestIdBody,
  ): Promise<Workspace> {
    return await this.workspacesService.deleteWorkspace(workspaceId);
  }
}
