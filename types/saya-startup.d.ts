// deno-fmt-ignore-file

declare global {
    var __sayaLastRgSelectorId: number | undefined;

    interface SayaReadonlyBufferSnapshot {
        id: number;
        path: string | null;
        lineCount: number;
        cursorRow: number;
        cursorCol: number;
        currentLine: string;
        text: string;
    }

    interface SayaBufferEventPayload {
        buffer: SayaReadonlyBufferSnapshot;
    }

    interface SayaReadonlyEditorSnapshot {
        mode: "Normal" | "Insert" | "Visual";
    }

    interface SayaRuntimeBufferSurface {
        current(): Promise<SayaReadonlyBufferSnapshot>;
    }

    interface SayaRuntimeEditorSurface {
        current(): Promise<SayaReadonlyEditorSnapshot>;
    }

    interface SayaCompletionPosition {
        line: number;
        character: number;
    }

    interface SayaCompletionRange {
        start: SayaCompletionPosition;
        end: SayaCompletionPosition;
    }

    interface SayaCompletionCandidate {
        label: string;
        insertText?: string | null;
        kind?: string | null;
        detail?: string | null;
        documentation?: string[];
        source?: string | null;
    }

    interface SayaCompletionContext {
        buffer: SayaReadonlyBufferSnapshot;
        editor: SayaReadonlyEditorSnapshot;
        prefix: string;
        replaceRange: SayaCompletionRange;
    }

    interface SayaCompletionSource {
        name: string;
        complete(context: SayaCompletionContext): Promise<SayaCompletionCandidate[]> | SayaCompletionCandidate[];
    }

    type SayaCompletionFilter = (
        candidates: SayaCompletionCandidate[],
        context: SayaCompletionContext,
    ) => SayaCompletionCandidate[];

    type SayaCompletionSorter = (
        candidates: SayaCompletionCandidate[],
        context: SayaCompletionContext,
    ) => SayaCompletionCandidate[];

    interface SayaCompletionRankingOptions {
        sourcePriority?: string[];
        deepCompletionPriority?: "default" | "afterDirect" | "last";
        duplicateLabels?: "default" | "preferFirstSource";
    }

    interface SayaCompletionOptions {
        commandName?: string;
        key?: string;
        minPrefixLength?: number;
        maxItems?: number;
        sourceTimeoutMs?: number;
        sources?: SayaCompletionSource[];
        filters?: SayaCompletionFilter[];
        sorters?: SayaCompletionSorter[];
        ranking?: SayaCompletionRankingOptions;
    }

    interface SayaCompletionShowRequest {
        sessionId: string;
        requestId: number;
        replaceRange: SayaCompletionRange;
        candidates: SayaCompletionCandidate[];
        selectedIndex?: number;
        maxVisibleItems?: number;
        documentationMaxWidth?: number;
        documentationMaxHeight?: number;
    }

    interface SayaRuntimeCompletionSurface {
        show(request: SayaCompletionShowRequest): Promise<boolean>;
    }

    interface SayaStartupOptionsSurface {
        tabstop: number;
        expandtab: boolean;
        shiftwidth: number;
        softtabstop: number;
        autoindent: boolean;
        smartindent: boolean;
        ignorecase: boolean;
        smartcase: boolean;
        syntax: boolean;
        scrolloff: number;
        sidescrolloff: number;
        wrap: boolean;
        number: boolean;
        relativenumber: boolean;
        cursorline: boolean;
        numberwidth: number;
        laststatus: number;
        cmdheight: number;
        list: boolean;
        listchars: string;
        foldmethod: string;
        foldlevel: number;
    }

    interface SayaStartupKeymapSurface {
        set(
            mode: "normal" | "insert" | "visual",
            lhs: string,
            action: string | SayaStartupCommandReference,
        ): void;
    }

    interface SayaStartupCommandReference {
        readonly __sayaStartupCommandReference: unique symbol;
    }

    interface SayaStartupCommandsSurface {
        register(name: string, callback: (...args: unknown[]) => unknown): void;
        execute(name: string): SayaStartupCommandReference;
    }

    interface SayaStartupEventsSurface {
        on(
            name: "bufferOpen" | "bufferChanged" | "bufferWritePost" | "bufferClosed",
            callback: (payload: SayaBufferEventPayload) => unknown,
        ): void;
    }

    interface SayaTextStyle {
        fg?: string;
        bg?: string;
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        strikethrough?: boolean;
    }

    type SayaSyntaxStyleKey =
        | "comment"
        | "string"
        | "constant"
        | "statement"
        | "identifier"
        | "type"
        | "function"
        | "punctuation"
        | "markup"
        | "default";

    interface SayaLanguageTheme {
        syntax?: Partial<Record<SayaSyntaxStyleKey, SayaTextStyle>>;
    }

    interface SayaStartupThemeSurface {
        palette: Record<string, string>;
        ui: Partial<Record<
            | "text"
            | "gutter"
            | "statusActive"
            | "statusInactive"
            | "message"
            | "warningMsg"
            | "prompt",
            SayaTextStyle
        >>;
        syntax: Partial<Record<SayaSyntaxStyleKey, SayaTextStyle>>;
        languages: Record<string, SayaLanguageTheme>;
        filer: Partial<Record<
            | "directory"
            | "file"
            | "symlink"
            | "other"
            | "marked",
            SayaTextStyle
        >>;
        markdown: Partial<Record<
            | "heading"
            | "heading1"
            | "heading2"
            | "heading3"
            | "heading4"
            | "heading5"
            | "heading6"
            | "inlineCode"
            | "link"
            | "listMarker"
            | "checkboxChecked"
            | "checkboxUnchecked"
            | "table"
            | "fencedCodeBlock",
            SayaTextStyle
        >>;
    }

    interface SayaStartupLogSurface {
        file?: string;
        level?: "error" | "warn" | "info" | "debug" | "trace";
    }

    interface SayaFtPluginDefinition {
        extensions?: string[];
        options?: Partial<SayaStartupOptionsSurface>;
        enabled?: boolean;
    }

    interface SayaStartupFtPluginSurface {
        enabled: boolean;
        set(filetype: string, definition: SayaFtPluginDefinition): void;
        disable(filetype: string): void;
    }

    interface SayaPluginUseSpec {
        name?: string;
        local?: string;
        github?: `${string}/${string}`;
        rev?: string;
        module?: string;
        setup?: string;
        options?: unknown;
    }

    interface SayaPluginLazySpec extends SayaPluginUseSpec {
        commands?: string[];
        events?: Array<"bufferOpen" | "bufferChanged" | "bufferWritePost" | "bufferClosed" | string>;
    }

    interface SayaStartupPluginsSurface {
        use(specs: SayaPluginUseSpec[]): void;
        lazy(specs: SayaPluginLazySpec[]): void;
    }

    interface SayaPromptSpec {
        title?: string;
        placeholder?: string;
    }

    interface SayaRuntimeInputSurface {
        prompt(spec: SayaPromptSpec): Promise<string | null>;
    }

    interface SayaSelectorSnapshot {
        id: number;
        renderedItems: unknown[];
        status: {
            collect: {
                totalStored: number;
            };
            match: {
                totalMatched: number;
            };
        };
    }

    interface SayaSelectorOpenSpec {
        source: {
            kind: "rg";
            root: string;
            pattern: string;
        };
        matcher?: "substringAnd" | string;
        query?: string;
        ui?: {
            window?: {
                width?: number | `${number}%`;
                height?: number | `${number}%`;
            };
        };
    }

    interface SayaRuntimeSelectorSurface {
        open(spec: SayaSelectorOpenSpec): Promise<SayaSelectorSnapshot>;
        control(
            id: number,
            spec: { command: "show" | "hide" | "cancel" | string },
        ): Promise<SayaSelectorSnapshot>;
    }

    interface SayaStartupSurface {
        options: SayaStartupOptionsSurface;
        keymap: SayaStartupKeymapSurface;
        commands: SayaStartupCommandsSurface;
        events: SayaStartupEventsSurface;
        theme: SayaStartupThemeSurface;
        log: SayaStartupLogSurface;
        ftplugin: SayaStartupFtPluginSurface;
        plugins: SayaStartupPluginsSurface;
        buffer: SayaRuntimeBufferSurface;
        editor: SayaRuntimeEditorSurface;
        completion: SayaRuntimeCompletionSurface;
        input: SayaRuntimeInputSurface;
        selector: SayaRuntimeSelectorSurface;
    }

    var saya: SayaStartupSurface;
}

export {};
