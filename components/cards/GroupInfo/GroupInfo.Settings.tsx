import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  groupId: string
}

export const Settings = ({ groupId }: Props) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    void (async () => {
      const href = ROUTES.GROUP_SETTINGS(groupId)
      await router.push(
        { pathname: href, query: { animation: 'forward' } },
        href,
      )
    })()
  }, [groupId, router])

  return (
    <Button
      rounded
      size="sm"
      theme="white"
      onClick={handleClick}
      iconStart={<Cog6ToothIcon />}
    />
  )
}
