import * as express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const t = trpc.initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  greeting: publicProcedure.query(() => {
    return {
      text: `Hello world` as const,
    };
  }),
});

// for use on client side
// export type AppRouter = typeof appRouter;

export const trpcExpressMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
});

const app = express();

app.use('/trpc', trpcExpressMiddleware);

app.listen(3000, 'localhost', () => {
  console.log(`[ ready ] http://localhost:3000`);
});

// test via  http://localhost:3000/trpc/greeting
// {"result":{"data":{"text":"Hello world"}}}
// Note normal usage is to use trpc client to call
