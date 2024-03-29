import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.js'
import { useWallets } from '../../../contexts/RootStore/hooks/useWallets.js'
import { Button } from '../../ui-kit/Button/Button.jsx'

interface Props {
  groupId: string
}

export const Add = ({ groupId }: Props) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = useCallback(() => {
    const walletId = createWallet()
    const href = ROUTES.WALLET(walletId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createWallet, router])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
