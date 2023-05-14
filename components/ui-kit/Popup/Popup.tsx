import { clsx } from 'clsx'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import {
  CSSProperties,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Portal } from '../Portal/Portal.tsx'

const variants: Variants = {
  opened: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 },
  },

  closed: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.075 },
  },
}

export type PopupPosition =
  | 'above-left'
  | 'above-right'
  | 'below-left'
  | 'below-right'

export interface PopupProps {
  anchorRef: RefObject<HTMLElement>
  className?: string
  fullMaxWidth?: boolean
  fullWidth?: boolean
  isOpen: boolean
  position: PopupPosition
  children: ReactNode
  onClose?: () => void
}

export const Popup = forwardRef<HTMLDivElement, PopupProps>(function Popup(
  {
    anchorRef,
    className,
    fullMaxWidth,
    fullWidth,
    isOpen,
    position,
    children,
    onClose,
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [anchorRect, setAnchorRect] = useState<DOMRect>()

  const popupStyle = useMemo<CSSProperties>(() => {
    if (!anchorRect) return { top: 0, left: 0 }

    const scrollTop = document.documentElement.scrollTop
    const scrollLeft = document.documentElement.scrollLeft

    switch (position) {
      case 'above-left':
        return {
          top: anchorRect.top + scrollTop,
          left: anchorRect.left + scrollLeft,
        }

      case 'above-right':
        return {
          top: anchorRect.top + scrollTop,
          left: anchorRect.right + scrollLeft,
        }

      case 'below-left':
        return {
          top: anchorRect.bottom + scrollTop,
          left: anchorRect.left + scrollLeft,
        }

      case 'below-right':
        return {
          top: anchorRect.bottom + scrollTop,
          left: anchorRect.right + scrollLeft,
        }
    }
  }, [anchorRect, position])

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose?.()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      const updateRects = () => {
        setAnchorRect(anchorRef.current?.getBoundingClientRect())
      }

      updateRects()
      window.addEventListener('resize', updateRects, { passive: true })
      return () => window.removeEventListener('resize', updateRects)
    }
  }, [anchorRef, isOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', handleClick), 0)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [handleClick, isOpen])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(ref, () => rootRef.current!)

  return (
    <Portal>
      <div
        ref={rootRef}
        className="absolute z-10 top-0 left-0"
        style={popupStyle}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={clsx(className, 'absolute', {
                'bottom-0 left-0': position === 'above-left',
                'bottom-0 right-0': position === 'above-right',
                'top-0 left-0': position === 'below-left',
                'top-0 right-0': position === 'below-right',
              })}
              initial="closed"
              animate="opened"
              exit="closed"
              variants={variants}
              style={{
                maxWidth: fullMaxWidth ? anchorRect?.width : undefined,
                width: fullWidth ? anchorRect?.width : undefined,
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  )
})
