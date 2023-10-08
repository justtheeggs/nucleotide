import { router } from "../trpc";
import { userRouter } from "./user";
import { tagsRouter } from "./tags";
import { projectRouter } from "./projects";
import { discoverRouter } from "./discover";
import { createRouter } from "./create";

export const appRouter = router({
  user: userRouter,
  tags: tagsRouter,
  projects: projectRouter,
  discover: discoverRouter,
  create: createRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
