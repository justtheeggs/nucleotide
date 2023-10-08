import { router } from '../trpc'
import { searchRouter } from './search'
import { userRouter } from './user'

export const appRouter = router({
  root: userRouter,
  search: searchRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
