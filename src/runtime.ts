import { Context, Layer, ManagedRuntime } from "effect";

class PlaceholderService extends Context.Tag("PlaceholderService")() {}

const PlaceholderLive = Layer.succeed(
  PlaceholderService,
  PlaceholderService.of({})
);

const appLayer = Layer.mergeAll(PlaceholderLive);

export const appRuntime = ManagedRuntime.make(appLayer);
