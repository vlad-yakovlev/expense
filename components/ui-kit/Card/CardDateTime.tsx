import { useCallback, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import {
  formatDateForInput,
  formatDateTime,
} from '../../../utils/formatDate.ts'
import { CardItem, CardItemProps } from './CardItem.tsx'

export type CardDateTimeProps = Modify<
  CardItemProps,
  {
    value: Date
    onChange: (value: Date) => void
    onClick?: never
  }
>

export const CardDateTime = ({
  labelClassName,
  valueClassName,
  value,
  onChange,
  ...rest
}: CardDateTimeProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const dateForInput = useMemo(() => formatDateForInput(value), [value])

  const handleClick = useCallback(() => {
    setIsEditing(true)
    setInputValue(dateForInput)
  }, [dateForInput])

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.currentTarget.blur()
          break

        case 'Escape':
          setIsEditing(false)
          break
      }
    },
    [],
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    [],
  )

  const handleInputBlur = useCallback(() => {
    if (inputValue && inputValue !== dateForInput) {
      onChange(new Date(inputValue))
    }

    setIsEditing(false)
  }, [inputValue, dateForInput, onChange])

  return (
    <CardItem
      labelClassName={twMerge('flex-none', labelClassName)}
      valueClassName={twMerge(
        'flex-auto min-w-0 text-right font-medium truncate',
        valueClassName,
      )}
      value={
        isEditing ? (
          <input
            className="w-full text-right bg-transparent focus:outline-none"
            autoFocus
            type="datetime-local"
            value={inputValue}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          formatDateTime(value)
        )
      }
      onClick={isEditing ? undefined : handleClick}
      {...rest}
    />
  )
}
