import { clsx } from 'clsx'
import { FC, MouseEvent, ReactNode } from 'react'

export interface CardButtonProps {
  active?: boolean
  disabled?: boolean
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CardButton: FC<CardButtonProps> = ({
  active,
  disabled,
  start,
  end,
  children,
  onClick,
}) => (
  <button
    className={clsx(
      'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left transition-colors',
      {
        'bg-white hover:bg-zinc-100': !active,
        'bg-zinc-100': active,
        'pointer-events-none': disabled,
      }
    )}
    type="button"
    onClick={onClick}
  >
    {start ? <div className="flex-none">{start}</div> : null}
    <div className="flex-auto truncate">{children}</div>
    {end ? <div className="flex-none">{end}</div> : null}
  </button>
)
