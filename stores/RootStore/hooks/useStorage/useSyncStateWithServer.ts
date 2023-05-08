import { Dispatch, useCallback, useEffect, useState } from 'react'
import { performSync } from '../../../../api/client/sync.ts'
import { useThrowError } from '../../../../hooks/useThrowError.ts'
import { getRemoteStorageBody } from '../../getters/storage.ts'
import { StorageAction } from '../../reducers/storage.ts'
import { RootStoreState, StorageActionType } from '../../types.tsx'
import { isTransactionEmpty } from '../../utils.ts'
import { getLocalStorageKey } from './constants.ts'

export const useSyncStateWithServer = (
  state: RootStoreState,
  dispatch: Dispatch<StorageAction>,
  isStateLoaded: boolean
) => {
  const throwError = useThrowError()

  const [shouldSyncAsap, setShouldSyncAsap] = useState(true)

  const sync = useCallback(async () => {
    try {
      setShouldSyncAsap(false)

      dispatch({ type: StorageActionType.START_SYNC })

      const body = getRemoteStorageBody(state)
      const syncStartedAt = new Date()
      const response = await performSync(body)

      if (response.coldStartNeeded) {
        window.localStorage.removeItem(getLocalStorageKey())
        throw new Error('Cold start needed')
      }

      dispatch({
        type: StorageActionType.SET_STATE_FROM_REMOTE_STORAGE,
        payload: { response, syncStartedAt },
      })
    } catch (error) {
      if ((error as Error | null)?.message === 'Cold start needed') {
        return throwError(error)
      }

      console.error(error)
      dispatch({ type: StorageActionType.ABORT_SYNC })
    }
  }, [dispatch, state, throwError])

  useEffect(() => {
    if (state.isSyncing) return
    if (!isStateLoaded) return setShouldSyncAsap(true)
    if (shouldSyncAsap) return void sync()

    const timerId = setTimeout(
      () => void sync(),
      isTransactionEmpty(state.nextSyncTransaction) ? 60000 : 2000
    )
    return () => clearTimeout(timerId)
  }, [
    isStateLoaded,
    shouldSyncAsap,
    state.isSyncing,
    state.nextSyncTransaction,
    sync,
  ])
}
