import { XMarkIcon } from '@heroicons/react/20/solid'
import { useCallback, useEffect, useMemo } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.jsx'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.js'
import { Button } from '../../ui-kit/Button/Button.jsx'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.jsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
}

export const CategoryFilter = ({ groupId, walletId }: Props) => {
  const { categoryFilter, setCategoryFilter, resetCategoryFilter } =
    useCategoryFilter()
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    return categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const valueForSelect = useMemo(() => {
    return {
      id: categoryFilter,
      label: categoryFilter || 'Show all',
    }
  }, [categoryFilter])

  const handleResetClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      resetCategoryFilter()
    },
    [resetCategoryFilter],
  )

  useEffect(() => {
    if (categories.length < 2) {
      resetCategoryFilter()
    }
  }, [categories.length, resetCategoryFilter])

  if (categories.length < 2) {
    return null
  }

  return (
    <>
      <Card.Divider />
      <Card.Select
        label="Category"
        options={options}
        value={valueForSelect}
        onChange={setCategoryFilter}
        suffix={
          !!categoryFilter && (
            <Button
              rounded
              size="sm"
              theme="zinc"
              iconStart={<XMarkIcon />}
              aria-label="Reset filter"
              onClick={handleResetClick}
            />
          )
        }
        aria-label={`Category filter: ${categoryFilter || 'Show all'}`}
      />
    </>
  )
}
