import { FC } from 'react'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const WalletInfoBalance: FC<Props> = ({ walletId }) => {
  const { walletBalance } = useWalletBalance({ walletId })

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
        />
      }
    >
      Balance
    </Card.Text>
  )
}
