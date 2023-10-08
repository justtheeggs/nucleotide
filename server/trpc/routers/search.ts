import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
export const searchRouter = router({
  search: publicProcedure.input(
    z.object({
      textSearch: z.string().nullish()
    })
  )

    .query(async ({ input, ctx }) => {
      if (input.textSearch) {
        const result = await ctx.prisma.user.findMany({
          where: {
            name: {
              contains: input.textSearch,
              mode: 'insensitive'
            }
          },
          select: {
            name: true
          }
        })
        return result
      }
      return null
    })
})
