export function setupTokyoNightTheme() {
  saya.theme.palette = {
    bg: "#24283b",
    bgDark: "#1f2335",
    bgHighlight: "#292e42",
    terminalBlack: "#414868",
    fg: "#c0caf5",
    fgDark: "#a9b1d6",
    fgGutter: "#3b4261",
    comment: "#565f89",
    dark3: "#545c7e",
    dark5: "#737aa2",
    blue: "#7aa2f7",
    blue0: "#3d59a1",
    blue1: "#2ac3de",
    blue2: "#0db9d7",
    blue5: "#89ddff",
    blue6: "#b4f9f8",
    blue7: "#394b70",
    cyan: "#7dcfff",
    magenta: "#bb9af7",
    magenta2: "#ff007c",
    purple: "#9d7cd8",
    orange: "#ff9e64",
    yellow: "#e0af68",
    green: "#9ece6a",
    green1: "#73daca",
    green2: "#41a6b5",
    teal: "#1abc9c",
    red: "#f7768e",
    red1: "#db4b4b",
  };

  saya.theme.ui = {
    text: {
      fg: "fg",
      bg: "bg",
    },
    gutter: {
      fg: "fgGutter",
      bg: "bg",
    },
    statusActive: {
      fg: "bg",
      bg: "blue",
      bold: true,
    },
    statusInactive: {
      fg: "fgDark",
      bg: "bgDark",
    },
    message: {
      fg: "fg",
      bg: "bgDark",
    },
    prompt: {
      fg: "blue5",
      bg: "bg",
    },
  };

  saya.theme.syntax = {
    comment: {
      fg: "comment",
      italic: true,
    },
    string: {
      fg: "green",
    },
    constant: {
      fg: "orange",
    },
    statement: {
      fg: "magenta",
    },
    identifier: {
      fg: "fg",
    },
    type: {
      fg: "blue1",
    },
    function: {
      fg: "blue",
    },
    punctuation: {
      fg: "dark5",
    },
    markup: {
      fg: "blue5",
    },
    default: {
      fg: "fg",
    },
  };

  saya.theme.languages = {
    go: {
      syntax: {
        function: {
          fg: "blue",
          bold: true,
        },
        string: {
          fg: "green",
        },
        type: {
          fg: "blue1",
        },
        statement: {
          fg: "magenta",
        },
      },
    },
    rust: {
      syntax: {
        function: {
          fg: "blue",
          bold: true,
        },
        string: {
          fg: "green",
        },
        type: {
          fg: "blue1",
        },
      },
    },
  };

  saya.theme.filer = {
    directory: {
      fg: "blue",
      bold: true,
    },
    file: {
      fg: "fg",
    },
    symlink: {
      fg: "cyan",
      underline: true,
    },
    other: {
      fg: "red",
    },
    marked: {
      bg: "blue7",
      bold: true,
    },
  };

  saya.theme.markdown = {
    heading: {
      fg: "blue",
      bold: true,
    },
    heading1: {
      fg: "magenta",
    },
    heading2: {
      fg: "green",
    },
    heading3: {
      fg: "yellow",
    },
    heading4: {
      fg: "orange",
    },
    heading5: {
      fg: "cyan",
    },
    heading6: {
      fg: "purple",
    },
    inlineCode: {
      fg: "orange",
      bg: "bgHighlight",
    },
    link: {
      fg: "blue1",
      underline: true,
    },
    listMarker: {
      fg: "blue",
    },
    checkboxChecked: {
      fg: "green",
      bold: true,
    },
    checkboxUnchecked: {
      fg: "comment",
    },
    table: {
      fg: "blue5",
    },
    fencedCodeBlock: {
      fg: "fg",
      bg: "bgDark",
    },
  };
}
