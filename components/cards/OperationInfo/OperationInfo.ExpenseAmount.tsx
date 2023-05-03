import assert from 'assert'
import { FC, useCallback } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { parseAmount } from '../../../utils/parseAmount.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const ExpenseAmount: FC<Props> = ({ operationId }) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = useCallback(
    (amountString: string) => {
      assert(operation.expenseWallet, 'expenseWallet is not defined')

      const amount = parseAmount(amountString, operation.expenseWallet.currency)
      if (isNaN(amount)) return
      setOperationExpenseAmount(amount)
    },
    [operation.expenseWallet, setOperationExpenseAmount]
  )

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-red-700"
      name="Amount"
      value={formatAmount(
        operation.expenseAmount,
        operation.expenseWallet.currency
      )}
      onChange={handleChange}
    />
  )
}