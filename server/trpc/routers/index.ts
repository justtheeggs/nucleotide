import { router } from '../trpc'
import { userRouter } from './user'
import { projectRouter } from './projects'

export const appRouter = router({
  root: userRouter,
  projects: projectRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
