import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getOperationsQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
  skip: z.coerce.number().nonnegative().optional(),
  take: z.coerce.number().positive().max(21).default(21).optional(),
})

export const getOperationQuerySchema = z.object({
  operationId: z.string().refine(isValidObjectId),
})

export const createOperationBodySchema = z.object({
  name: z.string().min(1),
  date: z.string().datetime(),
  amount: z.number(),
  category: z.string().min(1),
  walletId: z.string().refine(isValidObjectId),
})

export const updateOperationBodySchema = z.object({
  operationId: z.string().refine(isValidObjectId),
  name: z.string().min(1).optional(),
  date: z.string().datetime().optional(),
  amount: z.number().optional(),
  category: z.string().min(1).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
})
