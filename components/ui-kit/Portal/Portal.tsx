import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  if (!domLoaded) {
    return null
  }

  return createPortal(children, document.body)
}
