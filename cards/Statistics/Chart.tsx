import React from 'react'
import { Amount } from '@/components/common/Amount.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { PieChart, PieChartItem } from '@/components/common/PieChart/index.jsx'
import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '@/types/client.js'
import { formatAmount } from '@/utils/formatAmount.js'
import { formatPercent } from '@/utils/formatPercent.js'

const TITLE = {
  [ClientStatisticsType.INCOMES]: 'Incomes',
  [ClientStatisticsType.EXPENSES]: 'Expenses',
}

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Chart = ({ currency, items, type }: Props) => {
  const chartItems = React.useMemo<PieChartItem[]>(
    () =>
      items.map((item) => ({
        id: item.category,
        color: item.color,
        value: item.amount,
      })),
    [items],
  )

  const renderTooltip = React.useCallback(
    (itemId: string | null, total: number) => {
      const item = items.find((item) => item.category === itemId)

      return (
        <div
          className="max-w-[65%] pt-1 text-center"
          tabIndex={0}
          aria-label={`Total: ${formatAmount(total)} ${
            currency.name ?? currency.symbol
          }`}
        >
          <div className="text-tertiary truncate">
            {item ? item.category : TITLE[type]}
          </div>
          <Amount
            className="truncate text-lg font-medium"
            amount={item ? item.amount : total}
            currency={currency}
            type={AMOUNT_TYPE[type]}
          />
          <div className="text-tertiary">
            {formatPercent(item ? item.amount / total : 1)}
          </div>
        </div>
      )
    },
    [currency, items, type],
  )

  return (
    <Card.Block
      className="justify-center"
      aria-label="Chart"
      aria-disabled="true"
    >
      <PieChart
        className="max-w-56 flex-1"
        items={chartItems}
        renderTooltip={renderTooltip}
      />
    </Card.Block>
  )
}