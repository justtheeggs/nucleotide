import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const createRouter = router({
  createProject: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.user?.id != null) {
        const project = await ctx.prisma.project.create({
          data: {
            name: input.name,
            description: input.description,
            created_at: new Date(),
            deleted: false,
            geographic_scope: "global",
            recruiting: true,
            deleted_at: new Date(),
            status: "Planning_Design",
            members: {
              create: {
                user: {
                  connect: {
                    id: ctx.user?.user?.id,
                  },
                },
                role: "Owner",
              },
            },
          },
        });
        console.log("This should have made somethinf");
        return {
          status: true,
          message: "Project Created",
          id: project.id,
        };
      }
      console.log("Hello");
      return {
        status: false,
        id: null,
        message: "Could not create new project.",
      };
    }),
});
