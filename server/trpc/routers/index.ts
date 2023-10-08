import { router } from '../trpc'
import { userRouter } from './user'
import {tagsRouter} from './tags'
import { projectRouter } from './projects'

export const appRouter = router({
  user: userRouter,
  tags: tagsRouter,
  projects: projectRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
