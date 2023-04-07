import { prisma } from "~/server/db";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  createTodo: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
       const newTodo =  await prisma.todo.create({
         data: {
           name: input.name,
           description: input.description,
           userId: ctx.session.user.id,
         },
       });

       return newTodo;
    
    }),

    getTodos: protectedProcedure.query(async ({ ctx }) => {
      const todos = await prisma.todo.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      return todos;
    })
});
