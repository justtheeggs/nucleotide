import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { Tag } from "@prisma/client";
import { connect } from "http2";

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */

interface ChildTag {
  label: string;
  value: string;
  id: string;
}

interface AutocompleteTag {
  type: string;
  label: string;
  key: string;
  children: ChildTag[];
}

interface GroupTags {
  [key: string]: AutocompleteTag;
}
export const tagsRouter = router({
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
  getTags: privateProcedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //using ctx check of the username exist or not
      if (input?.name != null) {
        const categories = await ctx.prisma.category.findMany({
          ...(input?.name != null
            ? {
                where: {
                  tags: {
                    some: {
                      tag: {
                        name: {
                          contains: input?.name,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
              }
            : {}),
          take: 10,
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        });

        // console.log(tags)
        //group all categories by name with all tags as children
        const groups: GroupTags = {};
        for (const category of categories) {
          if (groups[category.name] == null) {
            groups[category.name] = {
              type: "group",
              label: category.name,
              key: category.name,
              children: [],
            };
          }
          for (const tags of category.tags) {
            groups[category.name].children.push({
              label: tags.tag.name,
              value: tags.tag.id + ":" + tags.tag.name,
              id: tags.tag.id,
            });
          }
        }

        const values = Object.values(groups);
        return values;
      }
      return null;
    }),

  getProjectTags: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const tags = await ctx.prisma.tag.findMany({
        where: {
          projects: {
            some: {
              project: {
                id: input.id,
              },
            },
          },
        },
        include: {
          categories: {
            include: {
              tag: true,
            },
          },
        },
      });
      //console.log(tags);
      return tags;
    }),

  getUserSelectTags: privateProcedure.mutation(async ({ ctx }) => {
    const tags = await ctx.prisma.tag.findMany({
      where: {
        users: {
          some: {
            user: {
              id: ctx.user?.user?.id,
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            tag: true,
            categories: true,
          },
        },
      },
    });

    return tags.map((tag) => {
      return tag.id + ":" + tag.name;
    });

    // const groups: GroupTags = {};
    // for (const tag of tags) {
    //   for (const category of tag.categories) {
    //     if (groups[category.categories.name] == null) {
    //       groups[category.categories.name] = {
    //         type: "group",
    //         label: category.categories.name,
    //         key: category.categories.name,
    //         children: [],
    //       };
    //     }
    //     groups[category.categories.name].children.push({
    //       label: tag.name,
    //       value: tag.id,
    //       id: tag.id,
    //     });
    //   }
    // }
    // const values = Object.values(groups);

    //return values;
  }),
  getUserTags: privateProcedure.query(async ({ ctx }) => {
    const tags = await ctx.prisma.tag.findMany({
      where: {
        users: {
          some: {
            user: {
              id: ctx.user?.user?.id,
            },
          },
        },
      },
      include: {
        categories: {
          include: {
            tag: true,
          },
        },
      },
    });
  }),
  addUserTag: privateProcedure
    .input(z.object({ tags: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      //1. check if the tags exist for the user

      const userTags = await ctx.prisma.userTag.findMany({
        where: {
          user_id: ctx.user?.user?.id,
        },
      });

      //Delete said tags

      console.log(input.tags);

      const values = input.tags.reduce(
        (r, o) => {
          r[
            o.includes(":") && o.split(":")[0].length == 0 ? "new" : "ids"
          ].push(o);
          return r;
        },
        { ids: [] as string[], new: [] as string[] }
      );

      const deletedTags = userTags
        .filter(async (item) => {
          !values.ids.includes(item.id);
        })
        .map((item) => {
          return item.id;
        });

      const newTags = values.ids
        .filter(async (item) => {
          !userTags.some((tag) => tag.id == item);
        })
        .map((item) => {
          return item;
        });

      if (deletedTags != null) {
        //delete the tags
        await ctx.prisma.userTag.deleteMany({
          where: {
            id: {
              in: deletedTags,
            },
          },
        });
      }

      if (newTags != null) {
        //add the tags
        const tagConnects = newTags.map((item) => {
          return {
            user_id: ctx.user?.user?.id as string,
            tag_id: item.split(":")[0],
          };
        });

        await ctx.prisma.userTag.createMany({
          data: tagConnects.map((userTag) => ({
            user_id: userTag.user_id,
            tag_id: userTag.tag_id,
          })),
        });
      }
    }),
});
