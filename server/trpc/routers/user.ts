import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const userRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date()
      }
    })
})
