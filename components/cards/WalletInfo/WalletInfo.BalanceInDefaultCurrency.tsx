import { useWallet } from '../../../contexts/RootStore/hooks/useWallet.js'
import { useWalletBalance } from '../../../contexts/RootStore/hooks/useWalletBalance.js'
import { Amount } from '../../ui-kit/Amount/Amount.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  walletId: string
}

export const BalanceInDefaultCurrency = ({ walletId }: Props) => {
  const { wallet } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  if (wallet.currency.id === wallet.group.defaultCurrency.id) {
    return null
  }

  return (
    <Card.Item
      label={
        <span>
          Balance in{' '}
          <span
            aria-label={
              wallet.group.defaultCurrency.name ??
              wallet.group.defaultCurrency.symbol
            }
          >
            {wallet.group.defaultCurrency.symbol}
          </span>
        </span>
      }
      value={
        <Amount
          className="select-text font-medium"
          amount={
            walletBalance.balance *
            (wallet.group.defaultCurrency.rate / walletBalance.currency.rate)
          }
          currency={wallet.group.defaultCurrency}
          showSign="negative"
          hideCurrency
        />
      }
    />
  )
}
