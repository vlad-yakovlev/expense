import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

const variants: Variants = {
  opened: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.15 },
  },

  closed: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.1 },
  },
}

export type PopupPosition =
  | 'above-left'
  | 'above-right'
  | 'below-left'
  | 'below-right'

export interface PopupProps {
  className?: string
  popupClassName?: string
  isOpen: boolean
  position: PopupPosition
  children: React.ReactNode
  ariaLabel?: string
  role?: string
  onClose?: () => void
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void
}

export const Popup = ({
  className,
  popupClassName,
  isOpen,
  position,
  children,
  ariaLabel,
  role,
  onClose,
  onPointerDown,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClick = (event: MouseEvent) => {
      if (!popupRef.current?.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.body.style.setProperty('pointer-events', 'none')
    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.body.style.removeProperty('pointer-events')
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [isOpen, onClose])

  return (
    <div className={twMerge('relative z-10', className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className={twMerge(
              'absolute pointer-events-auto',
              position === 'above-left' && 'bottom-0 left-0',
              position === 'above-right' && 'bottom-0 right-0',
              position === 'below-left' && 'top-0 left-0',
              position === 'below-right' && 'top-0 right-0',
              popupClassName,
            )}
            initial="closed"
            animate="opened"
            exit="closed"
            variants={variants}
            aria-label={ariaLabel}
            role={role}
            onPointerDown={onPointerDown}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
