import { setupSayaDired } from "$SAYA_HOME/runtime/plugins/bundled/dired/index.ts";

export function setupBundledPlugins() {
  setupSayaDired({ keymap: {} });
}
