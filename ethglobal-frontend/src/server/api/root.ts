import { userRouter } from "~/server/api/routers/user";
import { clientRouter } from "~/server/api/routers/client";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  client: clientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
