import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations.js'

interface Props {
  walletId: string | undefined
}

export const Add = ({ walletId }: Props) => {
  const router = useRouter()
  const { createOperation } = useOperations({ walletId })

  const handleCreate = React.useCallback(() => {
    const operationId = createOperation()
    const href = ROUTES.OPERATION(operationId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createOperation, router])

  if (!walletId) {
    return null
  }

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}