import { GetServerSideProps, NextPage } from 'next'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletProvider } from '../../../components/contexts/Wallet'
import { Wallet, WalletSkeleton } from '../../../components/Wallet'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { ErrorProvider } from '../../../components/contexts/Error'
import { CategoriesProvider } from '../../../components/contexts/Categories'

interface Props {
  walletId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      walletId: String(context.query.walletId),
    },
  }
}

const WalletPage: NextPage<Props> = ({ walletId }) => (
  <LoadingProvider>
    <ErrorProvider>
      <CategoriesProvider>
        <CurrenciesProvider>
          <OperationsProvider walletId={walletId}>
            <WalletProvider walletId={walletId}>
              <CheckSwrContexts
                renderLoading={() => <WalletSkeleton />}
                renderContent={() => <Wallet />}
              />
            </WalletProvider>
          </OperationsProvider>
        </CurrenciesProvider>
      </CategoriesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default WalletPage
