import { FC } from 'react'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const GroupInfoName: FC<Props> = ({ groupId }) => {
  const { group, setGroupName } = useGroup({ groupId })

  return <Card.Input name="Name" value={group.name} onChange={setGroupName} />
}
