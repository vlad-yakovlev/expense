import { FC, useMemo } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { OperationsListCard } from '../../cards/OperationsList/OperationsList.tsx'
import { StatisticsCard } from '../../cards/Statistics/Statistics.tsx'
import { WalletInfoCard } from '../../cards/WalletInfo/WalletInfo.tsx'
import { Breadcrumbs } from '../../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../../ui-kit/Columns/Columns.tsx'
import { NextHead } from '../../ui-kit/NextHead/NextHead.ts'
import { Title } from '../../ui-kit/Title/Title.tsx'

interface Props {
  walletId: string
}

export const Wallet: FC<Props> = ({ walletId }) => {
  const { wallet } = useWallet({ walletId })

  const walletName = `${wallet.name} ${wallet.currency.name}`

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(wallet.group.id),
        title: wallet.group.name,
      },
    ]
  }, [wallet.group.id, wallet.group.name])

  return (
    <>
      <NextHead>
        <title>{`Expense > ${walletName}`}</title>
      </NextHead>

      <Breadcrumbs parents={parents} />
      <Title>{walletName}</Title>

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard walletId={walletId} />
        <OperationsListCard walletId={walletId} />
        <StatisticsCard className="md:row-span-full" walletId={walletId} />
      </Columns>
    </>
  )
}
