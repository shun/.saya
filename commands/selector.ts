export function setupSelectorCommands() {
  saya.commands.register("selector.rgSelector", async () => {
    const formatCommandError = (error: unknown): string => {
      if (error instanceof Error) {
        return error.stack ?? error.message;
      }

      return String(error);
    };

    console.info("[selector.rgSelector] prompt start");

    const pattern = await saya.input.prompt({
      title: "rg pattern",
      placeholder: "pattern",
    });

    if (pattern === null) {
      console.info("[selector.rgSelector] prompt cancelled");
      return;
    }

    const trimmed = pattern.trim();
    console.info(
      `[selector.rgSelector] prompt resolved value_len=${pattern.length}`,
    );

    if (trimmed.length === 0) {
      console.info("[selector.rgSelector] empty pattern no-op");
      return;
    }

    console.info(
      `[selector.rgSelector] opening rg selector root=. pattern_len=${pattern.length}`,
    );

    try {
      const selectorSpec: SayaSelectorOpenSpec = {
        source: { kind: "rg", root: ".", pattern },
        matcher: "substringAnd",
        ui: {
          window: { width: "85%", height: "75%" },
        },
      };
      selectorSpec.query = pattern;

      const snapshot = await saya.selector.open(selectorSpec);
      globalThis.__sayaLastRgSelectorId = snapshot.id;

      console.info(
        "[selector.rgSelector] opened " +
          `id=${snapshot.id} ` +
          `rendered=${snapshot.renderedItems.length} ` +
          `stored=${snapshot.status.collect.totalStored} ` +
          `matched=${snapshot.status.match.totalMatched}`,
      );
    } catch (error) {
      console.error(
        `[selector.rgSelector] failed: ${formatCommandError(error)}`,
      );
      throw error;
    }
  });

  saya.commands.register("selector.rgResume", async () => {
    const lastRgSelectorId = globalThis.__sayaLastRgSelectorId ?? null;
    if (lastRgSelectorId === null) {
      console.info("[selector.rgResume] no previous rg selector");
      return;
    }

    console.info(`[selector.rgResume] show id=${lastRgSelectorId}`);
    try {
      await saya.selector.control(lastRgSelectorId, { command: "show" });
    } catch (error) {
      console.error(`[selector.rgResume] failed: ${String(error)}`);
      delete globalThis.__sayaLastRgSelectorId;
      throw error;
    }
  });
}
