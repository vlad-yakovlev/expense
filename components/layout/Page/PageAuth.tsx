import { useSession } from 'next-auth/react'
import { Home } from '../../pages/Home.jsx'
import { Loading } from '../../pages/Loading.jsx'

interface Props {
  children: React.ReactNode
}

export const PageAuth = ({ children }: Props) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' && children}
      {session.status === 'unauthenticated' && <Home />}
      {session.status === 'loading' && <Loading />}
    </>
  )
}
