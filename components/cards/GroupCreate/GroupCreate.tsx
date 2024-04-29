import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups.js'

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
        prefix={<PlusIcon className="h-6 w-6" />}
        label="Create"
        tabIndex={-1}
      />
    </Card>
  )
}
