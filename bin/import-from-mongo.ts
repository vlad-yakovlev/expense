import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { formatAmount } from '../utils/formatAmount.ts'
import { prisma } from '../utils/server/prisma.ts'

interface MongoCurrency {
  _id: { $oid: string }
  symbol: string
  name?: string
  rate: number
}

interface MongoUser {
  _id: { $oid: string }
  name: string
  email: string
  image: string
}

interface MongoAccount {
  _id: { $oid: string }
  type: string
  provider: string
  providerAccountId: string
  access_token: string
  expires_at: number
  token_type: string
  scope: string
  id_token: string
  userId: { $oid: string }
}

interface MongoGroup {
  _id: { $oid: string }
  removed: boolean
  name: string
  defaultCurrencyId: { $oid: string }
}

interface MongoUserGroup {
  _id: { $oid: string }
  removed: boolean
  userId: { $oid: string }
  groupId: { $oid: string }
}

interface MongoWallet {
  _id: { $oid: string }
  removed: false
  name: string
  order?: number
  currencyId: { $oid: string }
  groupId: { $oid: string }
}

interface MongoOperation {
  _id: { $oid: string }
  removed: boolean
  name: string
  category: string
  date: { $date: string }
  incomeAmount: number | { $numberLong: string }
  expenseAmount: number | { $numberLong: string }
  incomeWalletId?: { $oid: string }
  expenseWalletId?: { $oid: string }
}

const readJson = async <T>(name: string): Promise<T[]> => {
  const currenciesStr = await fs.promises.readFile(
    path.join(process.cwd(), `/from-mongo/${name}.json`),
    'utf8',
  )

  return JSON.parse(currenciesStr) as T[]
}

const createIdMap = (items: { _id: { $oid: string } }[]) => {
  return items.reduce<Record<string, string>>((acc, item) => {
    acc[item._id.$oid] = uuid()

    return acc
  }, {})
}

const parseDate = (date: { $date: string }) => {
  return new Date(date.$date)
}

const parseAmount = (amount: number | { $numberLong: string }) => {
  return formatAmount(
    (typeof amount === 'number' ? amount : Number(amount.$numberLong)) / 100,
  )
}

const importCurrencies = async (props: {
  currencies: MongoCurrency[]
  currencyIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.currencies.map((currency) =>
      prisma.currency.create({
        data: {
          id: props.currencyIdMap[currency._id.$oid],
          name: currency.name,
          symbol: currency.symbol,
          rate: currency.rate,
        },
      }),
    ),
  )
}

const importUsers = async (props: {
  users: MongoUser[]
  userIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.users.map((user) =>
      prisma.user.create({
        data: {
          id: props.userIdMap[user._id.$oid],
          name: user.name,
          email: user.email,
          image: user.image,
        },
      }),
    ),
  )
}

const importAccounts = async (props: {
  accounts: MongoAccount[]
  userIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.accounts.map((account) =>
      prisma.account.create({
        data: {
          id: uuid(),
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          user: {
            connect: {
              id: props.userIdMap[account.userId.$oid],
            },
          },
        },
      }),
    ),
  )
}

const importGroups = async (props: {
  transaction: { id: string }
  groups: MongoGroup[]
  groupIdMap: Record<string, string>
  currencyIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.groups.map((group) =>
      prisma.group.create({
        data: {
          id: props.groupIdMap[group._id.$oid],
          removed: group.removed,
          name: group.name,
          defaultCurrency: {
            connect: {
              id: props.currencyIdMap[group.defaultCurrencyId.$oid],
            },
          },
          transactions: {
            connect: {
              id: props.transaction.id,
            },
          },
        },
      }),
    ),
  )
}

const importUserGroups = async (props: {
  transaction: { id: string }
  userGroups: MongoUserGroup[]
  groupIdMap: Record<string, string>
  userIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.userGroups.map((userGroup) =>
      prisma.userGroup.create({
        data: {
          id: uuid(),
          removed: userGroup.removed,
          user: {
            connect: {
              id: props.userIdMap[userGroup.userId.$oid],
            },
          },
          group: {
            connect: {
              id: props.groupIdMap[userGroup.groupId.$oid],
            },
          },
          transactions: {
            connect: {
              id: props.transaction.id,
            },
          },
        },
      }),
    ),
  )
}

const importWallets = async (props: {
  transaction: { id: string }
  wallets: MongoWallet[]
  walletIdMap: Record<string, string>
  groupIdMap: Record<string, string>
  currencyIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.wallets.map((wallet) =>
      prisma.wallet.create({
        data: {
          id: props.walletIdMap[wallet._id.$oid],
          removed: wallet.removed,
          name: wallet.name,
          order: wallet.order,
          currency: {
            connect: {
              id: props.currencyIdMap[wallet.currencyId.$oid],
            },
          },
          group: {
            connect: {
              id: props.groupIdMap[wallet.groupId.$oid],
            },
          },
          transactions: {
            connect: {
              id: props.transaction.id,
            },
          },
        },
      }),
    ),
  )
}

const importOperations = async (props: {
  transaction: { id: string }
  operations: MongoOperation[]
  operationIdMap: Record<string, string>
  walletIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.operations.map((operation) =>
      prisma.operation.create({
        data: {
          id: props.operationIdMap[operation._id.$oid],
          removed: operation.removed,
          name: operation.name,
          category: operation.category,
          date: parseDate(operation.date),
          incomeAmount: parseAmount(operation.incomeAmount),
          expenseAmount: parseAmount(operation.expenseAmount),
          ...(operation.incomeWalletId && {
            incomeWallet: {
              connect: {
                id: props.walletIdMap[operation.incomeWalletId.$oid],
              },
            },
          }),
          ...(operation.expenseWalletId && {
            expenseWallet: {
              connect: {
                id: props.walletIdMap[operation.expenseWalletId.$oid],
              },
            },
          }),
          transactions: {
            connect: {
              id: props.transaction.id,
            },
          },
        },
      }),
    ),
  )
}

void (async () => {
  try {
    const currencies = await readJson<MongoCurrency>('expense.Currency')
    const users = await readJson<MongoUser>('expense.User')
    const accounts = await readJson<MongoAccount>('expense.Account')
    const groups = await readJson<MongoGroup>('expense.Group')
    const userGroups = await readJson<MongoUserGroup>('expense.UserGroup')
    const wallets = await readJson<MongoWallet>('expense.Wallet')
    const operations = await readJson<MongoOperation>('expense.Operation')

    const transaction = await prisma.transaction.create({
      data: {},
      select: { id: true },
    })

    const currencyIdMap = createIdMap(currencies)
    const userIdMap = createIdMap(users)
    const groupIdMap = createIdMap(groups)
    const walletIdMap = createIdMap(wallets)
    const operationIdMap = createIdMap(operations)

    await importCurrencies({
      currencies,
      currencyIdMap,
    })

    await importUsers({
      users,
      userIdMap,
    })

    await importAccounts({
      accounts,
      userIdMap,
    })

    await importGroups({
      transaction,
      groups,
      groupIdMap,
      currencyIdMap,
    })

    await importUserGroups({
      transaction,
      userGroups,
      groupIdMap,
      userIdMap,
    })

    await importWallets({
      transaction,
      wallets,
      walletIdMap,
      groupIdMap,
      currencyIdMap,
    })

    await importOperations({
      transaction,
      operations,
      operationIdMap,
      walletIdMap,
    })

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { completedAt: new Date() },
      select: { id: true },
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
