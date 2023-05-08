import { request } from '../../utils/client/request.ts'
import {
  AcceptInviteBody,
  AcceptInviteResponse,
  CreateInviteBody,
  CreateInviteResponse,
} from '../server/invites/types.ts'

export const createInvite = async (body: CreateInviteBody) => {
  const response = await request.put<CreateInviteBody, CreateInviteResponse>(
    '/api/invites/create',
    body
  )

  return {
    ...response,
    expiresAt: new Date(response.expiresAt),
  }
}

export const acceptInvite = async (body: AcceptInviteBody) => {
  await request.put<AcceptInviteBody, AcceptInviteResponse>(
    '/api/invites/accept',
    body
  )
}
