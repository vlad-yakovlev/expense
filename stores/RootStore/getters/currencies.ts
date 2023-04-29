import assert from 'assert'
import { ClientCurrency } from '../../../types/client.ts'
import { RootStoreState } from '../types.tsx'

export const getCurrencies = (state: RootStoreState): ClientCurrency[] => {
  return [...state.currencies].sort((a, b) => a.name.localeCompare(b.name))
}

export const getCurrency = (
  state: RootStoreState,
  currencyId: string
): ClientCurrency => {
  const currency = state.currencies.find(
    (currency) => currency.id === currencyId
  )
  assert(currency, 'Currency not found')

  return currency
}

interface GetDefaultCurrencyParams {
  groupId?: string
  walletId?: string
}

export const getDefaultCurrency = (
  state: RootStoreState,
  { groupId, walletId }: GetDefaultCurrencyParams = {}
): ClientCurrency => {
  if (walletId) {
    const wallet = state.wallets.find((wallet) => wallet.id === walletId)
    assert(wallet, 'Wallet not found')
    return getCurrency(state, wallet.currencyId)
  }

  if (groupId) {
    const group = state.groups.find((group) => group.id === groupId)
    assert(group, 'Group not found')
    return getCurrency(state, group.defaultCurrencyId)
  }

  const currency = state.currencies.find((currency) => currency.name === 'USD')
  assert(currency, 'Currency not found')
  return currency
}
