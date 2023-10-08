import { z } from 'zod'
import { privateProcedure, publicProcedure, router } from '../trpc'

/**
 * This is an example of a public procedure.
 * It requires a `text` input and returns a greeting.
 */
export const discoverRouter = router({
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    })
    // make tags a list of strings for each project, but each tag is a many-many relationship
    // so we need to map each tag to a string
    const newProjects = projects.map((project) => {
      const tags = project.tags.map((tag) => {
        return tag.tag.name
      })
      return {
        ...project,
        tags
      }
    })

    return newProjects
  }),
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      include: {
        tag: {
          include: {
            tag: true
          }
        }
      }
    })
    // make tags a list of strings for each project, but each tag is a many-many relationship
    // so we need to map each tag to a string
    const newUsers = users.map((user) => {
      const tags = users.tag.map((currentTag) => {
        return currentTag.tag.name
      })
      return {
        ...user,
        tags
      }
    })

    return newUsers
  })
})
