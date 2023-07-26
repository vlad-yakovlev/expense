import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './GroupInfo.Balance.tsx'
import { Members } from './GroupInfo.Members.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupInfoCard = ({ className, groupId }: Props) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" />
      <Card.Divider />
      <Members groupId={groupId} />
      <Balance groupId={groupId} />
    </Card>
  )
}
