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
} from "/Users/skudo/ghq/github.com/shun/saya_ws/saya.git/.wt/dev/plugins/bundled/completion/index.ts";
import { setupLspPlugin } from "./plugins/lsp.ts";
import { setupAgentPlugin } from "./plugins/agent.ts";
import { setupTokyoNightTheme } from "./theme/tokyo-night.ts";

setupLog();
setupOptions();
setupTokyoNightTheme();

setupBundledPlugins();
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
setupLspPlugin();
setupAgentPlugin();

setupSelectorCommands();
setupNormalKeymaps();
