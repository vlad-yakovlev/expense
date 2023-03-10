import Link from 'next/link'
import { FC } from 'react'
import LogoImage from '../../assets/logo.svg'

export const HeaderLogo: FC = () => {
  return (
    <Link className="block" href="/">
      <LogoImage className="h-6" />
    </Link>
  )
}
