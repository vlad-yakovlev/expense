import { produce } from 'immer'
import { Reducer, ReducerAction } from 'react'
import { getDefaultCurrency } from '../getters/currencies.ts'
import { RootStoreState, WalletsActionTypes } from '../types.tsx'

const createWalletReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.CREATE_WALLET
    payload: {
      walletId: string
      groupId: string
    }
  }
> = (state, { payload: { walletId, groupId } }) => {
  return produce(state, (draft) => {
    draft.wallets.push({
      id: walletId,
      removed: false,
      name: 'Untitled',
      order: null,
      currencyId: getDefaultCurrency(state, { groupId }).id,
      groupId: groupId,
    })
    draft.nextSyncTransaction.wallets.push(walletId)
  })
}

const removeWalletReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REMOVE_WALLET
    payload: {
      walletId: string
    }
  }
> = (state, { payload: { walletId } }) => {
  return produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.removed = true
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })
}

const setWalletNameReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_NAME
    payload: {
      walletId: string
      name: string
    }
  }
> = (state, { payload: { walletId, name } }) => {
  return produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.name = name
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })
}

const setWalletCurrencyReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.SET_WALLET_CURRENCY
    payload: {
      walletId: string
      currencyId: string
    }
  }
> = (state, { payload: { walletId, currencyId } }) => {
  return produce(state, (draft) => {
    draft.wallets.forEach((wallet) => {
      if (wallet.id === walletId) {
        wallet.currencyId = currencyId
        draft.nextSyncTransaction.wallets.push(walletId)
      }
    })
  })
}

const reorderWalletsReducer: Reducer<
  RootStoreState,
  {
    type: WalletsActionTypes.REORDER_WALLETS
    payload: {
      walletIds: string[]
    }
  }
> = (state, { payload: { walletIds } }) => {
  return produce(state, (draft) => {
    walletIds.forEach((walletId, order) => {
      draft.wallets.forEach((wallet) => {
        if (wallet.id === walletId) {
          wallet.order = order
          draft.nextSyncTransaction.wallets.push(walletId)
        }
      })
    })
  })
}

export type WalletsAction =
  | ReducerAction<typeof createWalletReducer>
  | ReducerAction<typeof removeWalletReducer>
  | ReducerAction<typeof setWalletNameReducer>
  | ReducerAction<typeof setWalletCurrencyReducer>
  | ReducerAction<typeof reorderWalletsReducer>

export const isWalletsAction = (action: {
  type: string
  payload?: unknown
}): action is WalletsAction => {
  return Object.values(WalletsActionTypes).includes(
    action.type as WalletsActionTypes
  )
}

export const walletsReducer: Reducer<RootStoreState, WalletsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case WalletsActionTypes.CREATE_WALLET:
      return createWalletReducer(state, action)

    case WalletsActionTypes.REMOVE_WALLET:
      return removeWalletReducer(state, action)

    case WalletsActionTypes.SET_WALLET_NAME:
      return setWalletNameReducer(state, action)

    case WalletsActionTypes.SET_WALLET_CURRENCY:
      return setWalletCurrencyReducer(state, action)

    case WalletsActionTypes.REORDER_WALLETS:
      return reorderWalletsReducer(state, action)
  }
}
