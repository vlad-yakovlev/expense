import { Currency } from '@prisma/client'

export type ClientCurrency = Pick<Currency, 'id' | 'name' | 'symbol' | 'rate'>

export interface GetCurrenciesResponse {
  currencies: ClientCurrency[]
}
