import { object, z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { ProjectStatus } from "@prisma/client";

const id = z.object({
  id: z.string(),
});

const img = z.object({
  id: z.string(),
  base64: z.string(),
});

const ids = z.object({
  ids: z.array(z.string()),
});

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const projectRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello from router ${input?.text ?? "world"}`,
        time: new Date(),
      };
    }),

  get_project_tagnames: publicProcedure
    .input(ids)
    .query(async ({ input, ctx }) => {
      const text = await ctx.prisma.tag.findMany({
        where: {
          id: { in: input.ids },
        },
      });
      console.log("hello world");
      console.log(text);
      return text;
    }),

  get_project_members: publicProcedure
    .input(ids)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),

  get_project_links: publicProcedure
    .input(ids)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),

  get_project_users: publicProcedure
    .input(ids)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.category.findMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),

  get_individual_project: publicProcedure
    .input(id)
    .query(async ({ input, ctx }) => {
      const projects = await ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          links: true,
          tags: {
            include: {
              tag: true,
            },
          },
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      return projects;
    }),
  update_project: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        status: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);

      const result = await ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          status: input.status as ProjectStatus,
        },
        include: {
          members: {
            where: {
              user_id: ctx.user?.user?.id,
            },
          },
        },
      });
      return {
        message: "Project updated",
        status: true,
      };
    }),
  get_requested_members: privateProcedure
    .input(id)
    .query(async ({ input, ctx }) => {
      if (ctx.user?.user?.id) {
        const result = await ctx.prisma.projectRequests.findMany({
          where: {
            project: {
              id: input.id,
            },
          },
          include: {
            user: true,
          },
        });
        return result;
      }
    }),
  decline_member: privateProcedure
    .input(
      z.object({
        id: z.string(),
        user: z.string(),
        request: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.user?.id) {
        const result = await ctx.prisma.projectRequests.delete({
          where: {
            id: input.request,
          },
        });
        return {
          message: "Member request removed",
          status: true,
        };
      }
    }),

  request_member: privateProcedure
    .input(
      z.object({
        project: z.string(),
        reason: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //check if they already hav a project request
      const result = await ctx.prisma.projectRequests.count({
        where: {
          user_id: ctx.user?.user?.id,
        },
      });

      if (result == 0) {
        await ctx.prisma.projectRequests.create({
          data: {
            project: {
              connect: {
                id: input.project,
              },
            },
            user: {
              connect: {
                id: ctx.user?.user?.id,
              },
            },
            reason: input.reason,
          },
        });
        return {
          status: true,
          message: "Request sent",
        };
      }
      return {
        status: false,
        message: "Request already sent",
      };
    }),
  accept_member: privateProcedure
    .input(
      z.object({
        id: z.string(),
        user: z.string(),
        request: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.user?.id) {
        const result = await ctx.prisma.projectRequests.delete({
          where: {
            id: input.request,
          },
        });
        const result2 = await ctx.prisma.project.update({
          where: {
            id: input.id,
          },
          data: {
            members: {
              create: {
                user_id: input.user,
              },
            },
          },
        });

        return {
          message: "Member added",
          status: true,
        };
      }
    }),

  // get_individual_project: publicProcedure
  // .input(id)
  // .query( async ({ input, ctx }) => {
  //     return await ctx.prisma.project.findFirst({
  //         where: {
  //             id: input.id,
  //         },
  //         include: {
  //             tags: true,
  //             members: true,
  //             links: true,
  //             categories: true,
  //         }
  //     })
  // }),

  // submit_image: privateProcedure
  //     .input(img)
  //     .query(({input, ctx}) => {
  //         const result = ctx.prisma.project.update({
  //             where: {
  //                 id: input.id,
  //             },
  //             data: {
  //                 project: {

  //                 }
  //             }
  //         })
  //     })
  // }),
});

//write th more to the comment below
