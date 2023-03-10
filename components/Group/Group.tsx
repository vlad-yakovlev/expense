import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { GroupInfoCard } from '../cards/GroupInfo'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { StatisticsCard } from '../cards/Statistics'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs, BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

export const Group: FC = () => {
  const { groupResponse } = useGroupContext()

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
    ]
  }, [])

  return (
    <>
      <Head>
        <title>
          {groupResponse
            ? `Expense > ${groupResponse.group.name}`
            : 'Loading...'}
        </title>
      </Head>

      {groupResponse ? (
        <Breadcrumbs title={groupResponse.group.name} parents={parents} />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns>
        <GroupInfoCard />
        <GroupUsersCard />
        <WalletsCard />
        <OperationsCard />
        <StatisticsCard />
      </Columns>
    </>
  )
}
