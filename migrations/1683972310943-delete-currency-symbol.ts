import { Db } from 'mongodb'

export const apply = async (db: Db) => {
  await db.collection('Currency').updateMany({}, { $unset: { symbol: '' } })
}