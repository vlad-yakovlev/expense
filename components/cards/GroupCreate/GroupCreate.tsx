import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroups } from '../../../contexts/RootStore/hooks/useGroups.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const GroupCreateCard = () => {
  const router = useRouter()
  const { createGroup } = useGroups()

  const handleCreate = useCallback(() => {
    const groupId = createGroup()
    const href = ROUTES.GROUP(groupId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createGroup, router])

  return (
    <Card aria-label="New group" onClick={handleCreate}>
      <Card.Title title="New Group" />
      <Card.Divider />
      <Card.Item
        prefix={<PlusIcon className="w-6 h-6" />}
        label="Create"
        tabIndex={-1}
      />
    </Card>
  )
}
