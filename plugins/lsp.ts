import { setupSayaLspClient } from "~/ghq/github.com/shun/saya_ws/saya.git/.wt/dev/plugins/bundled/lsp-client/index.ts";

export function setupLspPlugin() {
  setupSayaLspClient({
    enableBufferEvents: true,
    keymap: {},
    clientName: "saya-lsp",
    languageIdByExtension: {
      go: "go",
      js: "javascript",
      jsx: "javascriptreact",
      mjs: "javascript",
      cjs: "javascript",
      ts: "typescript",
      tsx: "typescriptreact",
      mts: "typescript",
      cts: "typescript",
    },
    trace: "messages",
    positionEncoding: "utf-16",
    completionTriggerCharacters: [".", ":", ">", "/", "'", '"', "`"],
    ui: {
      popups: {
        hover: { width: "60%", height: "35%" },
        diagnostics: { width: 72, height: 12 },
        locations: { width: "80%", height: "80%", basis: "editor" },
        symbols: { width: "70%", height: "60%", basis: "window" },
        signatureHelp: { width: 88, height: 14 },
      },
    },
    formattingOptions: {
      tabSize: 4,
      insertSpaces: true,
      trimTrailingWhitespace: true,
      insertFinalNewline: true,
    },
    codeActionKinds: ["quickfix", "refactor", "source.organizeImports"],
    servers: {
      go: {
        name: "gopls",
        command: "gopls",
        args: ["serve"],
        languages: ["go"],
        filePatterns: ["**/*.go"],
        rootMarkers: ["go.mod", ".git"],
        trace: "messages",
        positionEncoding: "utf-16",
        initializationOptions: {
          semanticTokens: true,
        },
      },
      typescript: {
        name: "vtsls",
        command: "vtsls",
        args: ["--stdio"],
        languages: [
          "javascript",
          "javascriptreact",
          "typescript",
          "typescriptreact",
        ],
        filePatterns: [
          "**/*.js",
          "**/*.jsx",
          "**/*.mjs",
          "**/*.cjs",
          "**/*.ts",
          "**/*.tsx",
          "**/*.mts",
          "**/*.cts",
        ],
        rootMarkers: [
          "deno.json",
          "deno.jsonc",
          "tsconfig.json",
          "jsconfig.json",
          "package.json",
          ".git",
        ],
        trace: "messages",
        positionEncoding: "utf-16",
        initializationOptions: {},
      },
    },
  });
}
