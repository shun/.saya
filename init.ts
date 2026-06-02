/// <reference path="./types/saya-startup.d.ts" />

import { setupLog } from "./core/log.ts";
import { setupOptions } from "./core/options.ts";
import { setupSelectorCommands } from "./commands/selector.ts";
import { setupNormalKeymaps } from "./keymaps/normal.ts";
import { setupBundledPlugins } from "./plugins/bundled.ts";
import {
  createBufferWordSource,
  createLspCompletionSource,
  createPathCompletionSource,
  setupSayaCompletion,
} from "~/ghq/github.com/shun/saya_ws/saya.git/.wt/dev/plugins/bundled/completion/index.ts";
import { setupLspPlugin } from "./plugins/lsp.ts";
import { setupAgentPlugin } from "./plugins/agent.ts";
import { setupTokyoNightTheme } from "./theme/tokyo-night.ts";

setupLog();
setupOptions();
saya.ftplugin.set("go", {
  extensions: ["go"],
  options: {
    expandtab: false,
    softtabstop: 0,
    shiftwidth: 0,
  },
});
setupTokyoNightTheme();

setupBundledPlugins();
setupLspPlugin();
setupSayaCompletion({
  key: "<C-x>",
  keys: {
    confirm: ["<Enter>", "<Tab>", "<C-y>"],
    close: ["<Esc>", "<C-[>"],
    next: ["<Down>", "<C-n>"],
    previous: ["<Up>", "<C-p>"],
    pageNext: ["<PageDown>"],
    pagePrevious: ["<PageUp>"],
  },
  autoTrigger: true,
  sourceTimeoutMs: 5000,
  ranking: {
    sourcePriority: ["lsp", "path", "buffer"],
    deepCompletionPriority: "last",
    duplicateLabels: "preferFirstSource",
  },
  sources: [
    createLspCompletionSource({ minPrefixLength: 1 }),
    createPathCompletionSource({
      minPrefixLength: 1,
      triggerCharacters: ["/", "."],
    }),
    createBufferWordSource({ minPrefixLength: 1 }),
  ],
});
saya.keymap.set("insert", "<C-h>", "\x08");
setupAgentPlugin();

setupSelectorCommands();
setupNormalKeymaps();
