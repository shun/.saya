import { setupSayaAgent } from "~/ghq/github.com/shun/saya_ws/saya.git/.wt/dev/plugins/saya-agent.ts";

export function setupAgentPlugin() {
  const config = setupSayaAgent({
    defaultTool: "codex",
    layout: {
      position: "right",
      size: "35%",
    },
    promptLibrary: [
      {
        name: "review-current-context",
        prompt:
          "Review the current context and suggest the next concrete step.\n",
      },
    ],
  });

  saya.keymap.set(
    "normal",
    "<leader>a",
    saya.commands.execute(config.commands.toggle),
  );
  saya.keymap.set(
    "normal",
    "<leader>A",
    saya.commands.execute(config.commands.focus),
  );
  saya.keymap.set(
    "normal",
    "<leader>s",
    saya.commands.execute(config.commands.sendCurrentLine),
  );
  saya.keymap.set(
    "visual",
    "<leader>s",
    saya.commands.execute(config.commands.sendSelectedRange),
  );
}
