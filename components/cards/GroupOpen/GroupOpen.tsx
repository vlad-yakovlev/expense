import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { useGroupBalance } from '../../../stores/RootStore/hooks/useGroupBalance.ts'
import { useGroupUsers } from '../../../stores/RootStore/hooks/useGroupUsers.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const GroupOpenCard: FC<Props> = ({ groupId }) => {
  const router = useRouter()
  const { group } = useGroup({ groupId })
  const { groupBalance } = useGroupBalance({ groupId })
  const { groupUsers } = useGroupUsers({ groupId })

  const handleClick = useCallback(() => {
    const href = ROUTES.GROUP(groupId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [groupId, router])

  return (
    <Card clickable onClick={handleClick}>
      <Card.Title
        title={group.name}
        actions={
          <AvatarGroup
            className="flex-none"
            avatars={groupUsers.map((user) => ({
              name: user.name ?? undefined,
              src: user.image ?? undefined,
            }))}
            max={3}
            size="sm"
          />
        }
      />

      <Card.Divider />

      <Card.Text
        label="Balance"
        value={
          <Amount
            className="font-medium select-text"
            amount={groupBalance.balance}
            currency={groupBalance.currency}
          />
        }
      />
    </Card>
  )
}
