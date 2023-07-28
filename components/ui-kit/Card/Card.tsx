import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { CardBlock } from './CardBlock.tsx'
import { CardDateTime } from './CardDateTime.tsx'
import { CardDivider } from './CardDivider.tsx'
import { CardFooter } from './CardFooter.tsx'
import { CardInput } from './CardInput.tsx'
import { CardItem } from './CardItem.tsx'
import { CardLink } from './CardLink.tsx'
import { CardMenu } from './CardMenu.tsx'
import { CardSelect } from './CardSelect.tsx'
import { CardSubtitle } from './CardSubtitle.tsx'
import { CardTitle } from './CardTitle.tsx'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: CardProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        event.currentTarget.click()
      }

      onKeyDown?.(event)
    },
    [onClick, onKeyDown],
  )

  return (
    <div
      className={twMerge(
        'py-2 bg-white rounded-md shadow-lg text-left ring-1 ring-black ring-opacity-5 transition-shadow',
        !!onClick && 'hover:shadow-2xl active:shadow-2xl cursor-pointer',
        className,
      )}
      role={onClick ? 'button' : 'list'}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  )
}

export * from './CardBlock.tsx'
Card.Block = CardBlock

export type * from './CardDateTime.tsx'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './CardFooter.tsx'
Card.Footer = CardFooter

export type * from './CardInput.tsx'
Card.Input = CardInput

export type * from './CardItem.tsx'
Card.Item = CardItem

export type * from './CardLink.tsx'
Card.Link = CardLink

export type * from './CardMenu.tsx'
Card.Menu = CardMenu

export type * from './CardSelect.tsx'
Card.Select = CardSelect

export type * from './CardSubtitle.tsx'
Card.Subtitle = CardSubtitle

export type * from './CardTitle.tsx'
Card.Title = CardTitle
