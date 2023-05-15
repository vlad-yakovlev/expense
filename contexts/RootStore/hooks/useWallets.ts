import assert from 'assert'
import { useCallback, useMemo } from 'react'
import { generateObjectId } from '../../../utils/client/generateObjectId.ts'
import { useRootStore } from '../RootStore.tsx'
import { getOrderedWallets } from '../getters/wallets.ts'
import { WalletsActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
}

export const useWallets = ({ groupId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const walletIds = useMemo<string[]>(
    () => getOrderedWallets(state, { groupId }).map((wallet) => wallet.id),
    [groupId, state]
  )

  const createWallet = useCallback(() => {
    assert(groupId, 'groupId is not defined')
    const walletId = generateObjectId()

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