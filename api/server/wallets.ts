import { NextApiHandler } from 'next'
import {
  CreateWalletResponse,
  DeleteWalletResponse,
  GetWalletResponse,
  GetWalletsResponse,
  UpdateWalletResponse,
} from '../types/wallets'
import {
  createWalletBodySchema,
  deleteWalletQuerySchema,
  getWalletQuerySchema,
  getWalletsQuerySchema,
  updateWalletBodySchema,
} from './schemas/wallets'
import { populateWalletBalance } from '../../utils/server/populateWalletBalance'
import { walletSelector } from './selectors'

export const getWallets: NextApiHandler<GetWalletsResponse> = async (
  req,
  res
) => {
  const query = getWalletsQuerySchema.parse(req.query)

  const walletsWithoutBalance = await req.prisma.wallet.findMany({
    where: {
      group: {
        id: query.groupId,
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelector,
  })

  const wallets = await Promise.all(
    walletsWithoutBalance.map((wallet) => populateWalletBalance(req, wallet))
  )

  res.status(200).json({ wallets })
}

export const getWallet: NextApiHandler<GetWalletResponse> = async (
  req,
  res
) => {
  const query = getWalletQuerySchema.parse(req.query)

  const walletWithoutBalance = await req.prisma.wallet.findFirstOrThrow({
    where: {
      id: query.walletId,
      group: {
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelector,
  })

  const wallet = await populateWalletBalance(req, walletWithoutBalance)

  res.status(200).json({ wallet })
}

export const createWallet: NextApiHandler<CreateWalletResponse> = async (
  req,
  res
) => {
  const body = createWalletBodySchema.parse(req.body)

  const walletWithoutBalance = await req.prisma.wallet.create({
    data: {
      name: body.name,
      currency: {
        connect: {
          id: body.currencyId,
        },
      },
      group: {
        connect: {
          id: body.groupId,
          userIds: {
            has: req.session.user.id,
          },
        },
      },
    },
    select: walletSelector,
  })

  const wallet = await populateWalletBalance(req, walletWithoutBalance)

  res.status(200).json({ wallet })
}

export const updateWallet: NextApiHandler<UpdateWalletResponse> = async (
  req,
  res
) => {
  const body = updateWalletBodySchema.parse(req.body)

  const walletWithoutBalance = await req.prisma.wallet.update({
    where: {
      id: body.walletId,
      group: {
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    data: {
      name: body.name,
      currencyId: body.currencyId,
      groupId: body.groupId,
    },
    select: walletSelector,
  })

  const wallet = await populateWalletBalance(req, walletWithoutBalance)

  res.status(200).json({ wallet })
}

export const deleteWallet: NextApiHandler<DeleteWalletResponse> = async (
  req,
  res
) => {
  const query = deleteWalletQuerySchema.parse(req.query)

  await req.prisma.wallet.delete({
    where: {
      id: query.walletId,
      group: {
        userIds: {
          has: req.session.user.id,
        },
      },
    },
  })

  res.status(200).json({ ok: true })
}
