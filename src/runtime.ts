import { Context, Effect, Layer, ManagedRuntime } from "effect";

class Config extends Context.Tag("Config")<
  Config,
  {
    readonly mode: "development" | "testing" | "production";
    readonly baseURL: string;
    readonly dbConnectionString: string;
  }
>() {}

const ConfigLive = Layer.effect(
  Config,
  Effect.gen(function* () {
    const mode =
      process.env.IS_PRODUCTION === "production" ? "production" : "development";
    const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
    const dbConnectionString = process.env.DATABASE_URL;

    if (!baseURL) throw new Error("BASE_URL environment variable is not set");
    if (!dbConnectionString)
      throw new Error("DATABASE_URL environment variable is not set");

    return Config.of({
      mode,
      baseURL,
      dbConnectionString,
    });
  })
);

const appLayer = Layer.mergeAll(ConfigLive);

export const appRuntime = ManagedRuntime.make(appLayer);
