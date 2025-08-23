import { createApi } from '@reduxjs/toolkit/query/react'
import query from '../utils/query'

export const api = createApi({
  reducerPath: 'api',
  baseQuery:query.baseQuery({}),
  endpoints: () => ({}),
})