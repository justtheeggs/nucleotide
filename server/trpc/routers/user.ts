import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const userRouter = router({
  // hello: publicProcedure
  //   .input(
  //     z.object({
  //       text: z.string().nullish(),
  //     })
  //   )
  //   .query(({ input, ctx }) => {
  //     return {
  //       greeting: `hello ${input?.text ?? "world"}`,
  //       time: new Date(),
  //     };
  //   }),
  usernameSearch: privateProcedure
    .input(
      z.object({
        username: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input?.username != null) {
        if (input?.username.length <= 2) {
          return {
            error: "Username must more than 3 characters",
            valid: false,
          };
        }
      }
      //using ctx check of the username exist or not
      const hasUsername =
        (await ctx.prisma.user.count({
          where: {
            username: input?.username,
          },
        })) == 0;

      console.log(ctx.user?.user?.id);

      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user?.user?.id,
        },
        select: {
          username: true,
        },
      });

      //if the username is the same as the current username
      //then it is valid because the user is not changing the username
      if (result?.username == input?.username) {
        return {
          error: "",
          valid: true,
        };
      }
      return {
        error: "",
        valid: true,
      };
    }),
  getUsername: privateProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user?.user?.id,
      },
      select: {
        username: true,
      },
    });
    return result?.username;
  }),
  updateUsername: privateProcedure
    .input(
      z.object({
        username: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input?.username != null) {
        if (input?.username.length <= 2) {
          return {
            message: "Username must more than 3 characters",
            error: true,
          };
        }
      }
      const hasUsername =
        (await ctx.prisma.user.count({
          where: {
            username: input?.username,
          },
        })) == 0;

      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user?.user?.id,
        },
        select: {
          username: true,
        },
      });

      if (result?.username == input?.username) {
        return {
          error: false,
          message: "",
        };
      }

      if (hasUsername) {
        await ctx.prisma.user.update({
          where: {
            id: ctx.user?.user?.id,
          },
          data: {
            username: input?.username,
          },
        });
        return {
          error: false,
          message: "Username updated",
        };
      }
      return {
        error: true,
        message: "Username could not be updated.",
      };
    }),

  getAbout: privateProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user?.user?.id,
      },
      select: {
        about: true,
      },
    });
    return result?.about;
  }),
  updateAbout: privateProcedure
    .input(
      z.object({
        about: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.user?.user?.id,
        },
        data: {
          about: input?.about,
        },
      });
      return {
        error: false,
        message: "About updated",
      };
    }),
});
