import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getCategoriesQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
})
