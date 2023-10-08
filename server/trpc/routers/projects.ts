import { object, z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";

const id = z.object({
    id: z.string(), 
})

const img = z.object({
    id: z.string(),
    base64: z.string(), 
})

const ids = z.object({
    ids: z.array(z.string())
})

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

    get_individual_project: publicProcedure
        .input(id)
        .query( async ({ input, ctx }) => {
            return await ctx.prisma.project.findFirst({
                where: {
                    id: input.id,
                },
                include: {
                    tags: true,
                    members: true,
                    links: true,
                    categories: true,
                }
            })
        }),

    get_project_tagnames: publicProcedure
        .input(ids)
        .query( async ({input, ctx}) => {
            return await ctx.prisma.tag.findMany({
                where: {
                    id: { in: input.ids }
                }
            })
        }),

    get_project_members: publicProcedure
        .input(ids)
        .query(async ({input, ctx}) => {
            return await ctx.prisma.user.findMany({
                where: {
                    id: { in: input.ids }
                }
            })
        }),
    
    get_project_links: publicProcedure
        .input(ids)
        .query(async ({input, ctx}) => {
            return await ctx.prisma.user.findMany({
                where: {
                    id: { in: input.ids }
                }
            })
        })
    
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

