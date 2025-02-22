
import {Status} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {Workspace} from '../../workspace/entities/workspace.entity'


export class UsersOnWorkspaces {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
user?: User ;
workspace?: Workspace ;
userId: string ;
workspaceId: string ;
teamIds: string[] ;
status: Status ;
}
