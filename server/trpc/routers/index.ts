import { router } from '../trpc'
import { userRouter } from './user'
import {tagsRouter} from './tags'
export const appRouter = router({
  user: userRouter,
  tags: tagsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
