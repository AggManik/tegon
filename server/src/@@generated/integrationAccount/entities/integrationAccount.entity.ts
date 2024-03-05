
import {Prisma} from '@prisma/client'
import {IntegrationDefinition} from '../../integrationDefinition/entities/integrationDefinition.entity'
import {Workspace} from '../../workspace/entities/workspace.entity'


export class IntegrationAccount {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deleted: Date  | null;
integrationConfiguration: Prisma.JsonValue ;
integrationDefinition?: IntegrationDefinition ;
integrationDefinitionId: string ;
workspace?: Workspace ;
workspaceId: string ;
}
