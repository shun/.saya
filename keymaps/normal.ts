export function setupNormalKeymaps() {
  saya.keymap.set("normal", "sg", saya.commands.execute("selector.rgSelector"));
  saya.keymap.set("normal", "sr", saya.commands.execute("selector.rgResume"));
}
