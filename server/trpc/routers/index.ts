import { router } from '../trpc'
import { searchRouter } from './search'
import { userRouter } from './user'
import { tagsRouter } from './tags'
import { projectRouter } from './projects'
import { discoverRouter } from './discover'

export const appRouter = router({
  root: userRouter,
  search: searchRouter,
  tags: tagsRouter,
  projects: projectRouter,
  discover: discoverRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
