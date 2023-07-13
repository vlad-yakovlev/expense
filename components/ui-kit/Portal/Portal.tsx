import { createPortal } from 'react-dom'
import { useIsBrowser } from '../../../hooks/useIsBrowser.ts'

export interface PortalProps {
  children: React.ReactNode
}

export const Portal = ({ children }: PortalProps) => {
  const isBrowser = useIsBrowser()

  if (!isBrowser) {
    return null
  }

  return createPortal(children, document.body)
}
