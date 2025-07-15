import { Data, Effect } from "effect";

import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Result } from "@/lib/types";
import { auth } from "@/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";

class UserSessionError extends Data.TaggedError("UserSessionError")<{
  cause: unknown;
}> {}

class UserNotFoundError extends Data.TaggedError("UserNotFoundError")<{
  cause: unknown;
}> {}

export const getUser = (headers: ReadonlyHeaders) =>
  Effect.gen(function* () {
    const userSession = yield* Effect.tryPromise({
      try: () => auth.api.getSession({ headers }),
      catch: (error) => {
        return new UserSessionError({ cause: error });
      },
    });

    if (!userSession?.user) {
      throw new UserSessionError({
        cause: new Error("User session not found"),
      });
    }
    const result: Result<typeof userSession.user> = {
      data: userSession.user,
    };
    return result;
  }).pipe(
    Effect.catchTags({
      UserSessionError: (error) => {
        return Effect.succeed({
          error: error.message,
          data: undefined,
        } as const);
      },
    })
  );

export const updateUserSettings = (
  userid: string,
  {
    name,
    email,
  }: {
    name: string;
    email: string;
  }
) =>
  Effect.gen(function* () {
    const currentUser = yield* Effect.tryPromise({
      try: () =>
        db.query.user.findFirst({
          where: (user) => eq(user.id, userid),
        }),
      catch: (error) => {
        return new UserNotFoundError({ cause: error });
      },
    });

    if (!currentUser) {
      return yield* Effect.fail(
        new UserNotFoundError({
          cause: new Error("User not found"),
        })
      );
    }

    yield* Effect.tryPromise({
      try: () =>
        db.update(user).set({
          name: name ?? currentUser.name,
          email: email ?? currentUser.email,
        }),
      catch: (error) => {
        return new UserNotFoundError({ cause: error });
      },
    });

    return {
      data: "success",
      error: undefined,
    } as const;
  }).pipe(
    Effect.catchTags({
      UserNotFoundError: (error) => {
        return Effect.succeed({
          error: error.message,
          data: undefined,
        } as const);
      },
    })
  );
