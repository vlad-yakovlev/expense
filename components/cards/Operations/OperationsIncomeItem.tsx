import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { ClientOperation } from '../../../api/types/operations'
import { ROUTES } from '../../../constants/routes'
import { formatDate } from '../../../utils/formatDate'
import { useOperationsContext } from '../../contexts/Operations'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

interface Props {
  operation: ClientOperation
}

export const OperationsIncomeItem: FC<Props> = ({ operation }) => {
  const router = useRouter()
  const { operationsPayload } = useOperationsContext()

  const handleClick = useCallback(async () => {
    await router.push(ROUTES.OPERATION(operation.id))
  }, [operation.id, router])

  if (!operation.incomeWallet) {
    return null
  }

  return (
    <Card.Button onClick={handleClick}>
      <div className="flex items-center gap-3">
        <div className="flex-auto truncate">
          {operation.category} – {operation.name}
        </div>
        <Amount
          className="flex-none font-medium"
          amount={operation.incomeAmount}
          currency={operation.incomeWallet.currency}
          type="income"
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <div className="flex-none">{formatDate(operation.date)}</div>
        {!operationsPayload.walletId && (
          <div className="flex-auto min-w-0 text-right truncate">
            {operation.incomeWallet.name}
          </div>
        )}
      </div>
    </Card.Button>
  )
}
