import assert from 'assert'
import { useCallback, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import { useRootStore } from '../RootStore.jsx'
import { getOrderedWallets } from '../getters/wallets.js'
import { WalletsActionTypes } from '../types.jsx'

interface Props {
  groupId?: string
}

export const useWallets = ({ groupId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const walletIds = useMemo<string[]>(
    () => getOrderedWallets(state, { groupId }).map((wallet) => wallet.id),
    [groupId, state],
  )

  const createWallet = useCallback(() => {
    assert(groupId, 'groupId is not defined')
    const walletId = uuid()

    dispatch({
      type: WalletsActionTypes.CREATE_WALLET,
      payload: { walletId, groupId },
    })

    return walletId
  }, [dispatch, groupId])

  return {
    walletIds,
    createWallet,
  }
}
