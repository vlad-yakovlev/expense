import { FC, useCallback, useMemo, useState } from 'react'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Card } from '../../ui-kit/Card'
import { StatisticsCategories } from './StatisticsCategories'
import { StatisticsCharts } from './StatisticsCharts'
import { StatisticsPeriod } from './StatisticsPeriod'

interface Props {
  className?: string
}

export const StatisticsCard: FC<Props> = ({ className }) => {
  const { statisticsByCategoryResponse } = useStatisticsByCategoryContext()

  const [disabledCategories, setDisabledCategories] = useState<
    Record<string, boolean>
  >({})

  const chartItems = useMemo(() => {
    return (
      statisticsByCategoryResponse?.statisticsByCategory.items.map((item) => ({
        ...item,
        ...(disabledCategories[item.category] && {
          incomeAmount: 0,
          expenseAmount: 0,
        }),
      })) || []
    )
  }, [disabledCategories, statisticsByCategoryResponse])

  const isCategoryDisabled = useCallback(
    (category: string) => {
      return !!disabledCategories[category]
    },
    [disabledCategories]
  )

  const setCategoryDisabled = useCallback(
    (category: string, disabled: boolean) => {
      setDisabledCategories((disabledCategories) => {
        return {
          ...disabledCategories,
          [category]: disabled,
        }
      })
    },
    []
  )

  return (
    <Card className={className} title="Statistics">
      <StatisticsPeriod />

      <StatisticsCharts
        currency={statisticsByCategoryResponse?.statisticsByCategory.currency}
        items={chartItems}
      />

      {!!statisticsByCategoryResponse?.statisticsByCategory.items.length && (
        <StatisticsCategories
          currency={statisticsByCategoryResponse.statisticsByCategory.currency}
          items={statisticsByCategoryResponse.statisticsByCategory.items}
          isCategoryDisabled={isCategoryDisabled}
          setCategoryDisabled={setCategoryDisabled}
        />
      )}

      {!statisticsByCategoryResponse && (
        <>
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
        </>
      )}
    </Card>
  )
}
