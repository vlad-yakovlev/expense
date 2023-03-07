import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteGroup } from '../../../api/client/groups'
import { ROUTES } from '../../../constants/routes'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { useWalletsContext } from '../../contexts/Wallets'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency'
import { GroupInfoName } from './GroupInfoName'

export const GroupInfoCard: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { group } = useGroupContext()
  const { wallets } = useWalletsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setLoading(true)
      setIsDeleteConfirmOpen(false)

      await deleteGroup({
        groupId: group.id,
      })

      await router.push(ROUTES.DASHBOARD)
    } finally {
      setLoading(false)
    }
  }, [group.id, router, setLoading])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <Card>
      <Card.Title
        title="Info"
        action={
          wallets.length === 0 ? (
            <Button
              rounded
              size="sm"
              theme="error"
              iconStart={<XMarkIcon />}
              onClick={handleDelete}
            />
          ) : undefined
        }
      />

      <Card.Divider />

      <GroupInfoName />

      <GroupInfoDefaultCurrency />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete group"
        description="Are you sure you want to delete group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Card>
  )
}
