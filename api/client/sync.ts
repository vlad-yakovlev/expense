import { request } from '../../utils/client/request.ts'
import { PerformSyncBody, PerformSyncResponse } from '../server/sync/types.ts'

export const performSync = async (body: PerformSyncBody) => {
  return await request.post<PerformSyncBody, PerformSyncResponse>(
    '/api/sync',
    body
  )
}
