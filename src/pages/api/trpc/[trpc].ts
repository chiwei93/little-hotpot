import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

const node_env = process.env.NODE_ENV ?? "development";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    node_env === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
