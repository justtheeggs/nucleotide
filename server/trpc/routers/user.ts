import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const userRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
        time: new Date(),
      };
    }),
  auth_test: privateProcedure.mutation(({ input, ctx }) => {
    console.log(ctx.user);
    return JSON.stringify(ctx.user);
  }),
});
