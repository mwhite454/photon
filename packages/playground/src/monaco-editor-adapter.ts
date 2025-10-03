/**
 * Monaco Editor Adapter for Maker.js Playground
 * Provides a compatibility layer to replace CodeMirror with Monaco Editor
 */

declare var monaco: any;

namespace MonacoEditorAdapter {

// Define interfaces that match CodeMirror API for compatibility
export interface Position {
    line: number;
    ch: number;
}

export interface TextMarker {
    clear(): void;
    find(): { from: Position; to: Position } | null;
    getOptions(): any;
}

export interface Doc {
    getValue(): string;
    setValue(content: string): void;
    getLine(line: number): string;
    markText(from: Position, to: Position, options: any): TextMarker;
    getCursor(): Position;
    replaceRange(replacement: string, from: Position, to?: Position): void;
    undo(): void;
}

export interface EditorConfiguration {
    value?: string;
    extraKeys?: { [key: string]: () => void };
    lineNumbers?: boolean;
    gutters?: string[];
    lint?: boolean;
    theme?: string;
    viewportMargin?: number;
    styleActiveLine?: boolean;
    mode?: string;
}

export interface Editor {
    getDoc(): Doc;
    setSize(width: number | null, height: number | string): void;
    refresh(): void;
    focus(): void;
}

class MonacoDoc implements Doc {
    constructor(private editor: any) {}

    getValue(): string {
        return this.editor.getValue();
    }

    setValue(content: string): void {
        this.editor.setValue(content);
    }

    getLine(line: number): string {
        const model = this.editor.getModel();
        if (!model) return '';
        return model.getLineContent(line + 1); // Monaco uses 1-based line numbers
    }

    markText(from: Position, to: Position, options: any): TextMarker {
        const model = this.editor.getModel();
        if (!model) {
            return { 
                clear: () => {},
                find: () => null,
                getOptions: () => options
            };
        }

        const monacoInstance = (window as any).monaco || monaco;
        const range = new monacoInstance.Range(
            from.line + 1, from.ch + 1,
            to.line + 1, to.ch + 1
        );

        const decoration = this.editor.deltaDecorations([], [{
            range: range,
            options: {
                className: options.className || 'monaco-error-decoration',
                hoverMessage: { value: options.title || 'Error' },
                inlineClassName: options.className || 'monaco-error-inline'
            }
        }]);

        return {
            clear: () => {
                this.editor.deltaDecorations(decoration, []);
            },
            find: () => ({ from, to }),
            getOptions: () => options
        };
    }

    getCursor(): Position {
        const position = this.editor.getPosition();
        if (!position) return { line: 0, ch: 0 };
        return {
            line: position.lineNumber - 1, // Convert to 0-based
            ch: position.column - 1
        };
    }

    replaceRange(replacement: string, from: Position, to?: Position): void {
        const model = this.editor.getModel();
        if (!model) return;

        const endPos = to || from;
        const monacoInstance = (window as any).monaco || monaco;
        const range = new monacoInstance.Range(
            from.line + 1, from.ch + 1,
            endPos.line + 1, endPos.ch + 1
        );

        this.editor.executeEdits('playground', [{
            range: range,
            text: replacement
        }]);
    }

    undo(): void {
        this.editor.trigger('playground', 'undo', null);
    }
}

class MonacoEditorAdapter implements Editor {
    private monacoEditor: any;
    private doc: MonacoDoc;
    private keyBindings: { [key: string]: () => void } = {};

    constructor(
        container: HTMLElement | ((element: HTMLElement) => void),
        options: EditorConfiguration
    ) {
        // Create container element if a function is provided (CodeMirror style)
        let targetElement: HTMLElement;
        if (typeof container === 'function') {
            targetElement = document.createElement('div');
            targetElement.style.width = '100%';
            targetElement.style.height = '100%';
            container(targetElement);
        } else {
            targetElement = container;
        }

        // Configure Monaco Editor
        const monacoOptions: any = {
            value: options.value || '',
            language: 'javascript',
            theme: this.mapTheme(options.theme),
            lineNumbers: options.lineNumbers !== false ? 'on' : 'off',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontSize: 14,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            renderLineHighlight: options.styleActiveLine ? 'line' : 'none'
        };

        const monacoInstance = (window as any).monaco || monaco;
        this.monacoEditor = monacoInstance.editor.create(targetElement, monacoOptions);
        this.doc = new MonacoDoc(this.monacoEditor);

        // Set up key bindings
        if (options.extraKeys) {
            this.keyBindings = options.extraKeys;
            this.setupKeyBindings();
        }

        // Add error decoration styles
        this.addErrorStyles();
    }

    private mapTheme(codeMirrorTheme?: string): string {
        switch (codeMirrorTheme) {
            case 'twilight':
                return 'vs-dark';
            default:
                return 'vs';
        }
    }

    private setupKeyBindings(): void {
        Object.entries(this.keyBindings).forEach(([key, handler]) => {
            const keybinding = this.parseKeyBinding(key);
            if (keybinding) {
                this.monacoEditor.addCommand(keybinding, handler);
            }
        });
    }

    private parseKeyBinding(key: string): number | null {
        // Convert CodeMirror key bindings to Monaco key codes
        switch (key) {
            case 'Ctrl-Enter':
                const monacoInstance = (window as any).monaco || monaco;
                return monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter;
            case 'Ctrl-I':
                const monacoInstance2 = (window as any).monaco || monaco;
                return monacoInstance2.KeyMod.CtrlCmd | monacoInstance2.KeyCode.KeyI;
            default:
                return null;
        }
    }

    private addErrorStyles(): void {
        // Add CSS styles for error decorations
        const style = document.createElement('style');
        style.textContent = `
            .monaco-error-decoration {
                background-color: rgba(255, 0, 0, 0.2);
                border-bottom: 2px wavy red;
            }
            .monaco-error-inline {
                text-decoration: underline wavy red;
            }
        `;
        document.head.appendChild(style);
    }

    getDoc(): Doc {
        return this.doc;
    }

    setSize(width: number | null, height: number | string): void {
        const container = this.monacoEditor.getContainerDomNode();
        if (width !== null) {
            container.style.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== null) {
            container.style.height = typeof height === 'number' ? `${height}px` : height;
        }
        this.monacoEditor.layout();
    }

    refresh(): void {
        this.monacoEditor.layout();
    }

    focus(): void {
        this.monacoEditor.focus();
    }

    dispose(): void {
        this.monacoEditor.dispose();
    }
}

    // Export a factory function that matches CodeMirror's API
    export function createEditor(
        container: HTMLElement | ((element: HTMLElement) => void),
        options: EditorConfiguration
    ): Editor {
        // Check if Monaco is available (check both global and window)
        const windowMonaco = (window as any).monaco;
        const monacoAvailable = typeof monaco !== 'undefined' || typeof windowMonaco !== 'undefined';
        
        if (!monacoAvailable) {
            console.warn('Monaco Editor is not loaded yet. Showing fallback editor...');
            console.log('Window monaco:', typeof windowMonaco);
            console.log('Global monaco:', typeof monaco);
            console.log('Monaco loaded flag:', (window as any).monacoLoaded);
            // Return a fallback editor that shows an error message
            return new FallbackEditor(container, options);
        }
        
        // Use window.monaco if global monaco is not available
        if (typeof monaco === 'undefined' && typeof windowMonaco !== 'undefined') {
            // Make window.monaco available as global monaco for our adapter
            (globalThis as any).monaco = windowMonaco;
        }
        console.log('Monaco Editor is available, creating editor...');
        return new MonacoEditorAdapter(container, options);
    }

    // Fallback editor for when Monaco isn't loaded
    class FallbackEditor implements Editor {
        private element: HTMLElement;
        
        constructor(
            container: HTMLElement | ((element: HTMLElement) => void),
            options: EditorConfiguration
        ) {
            this.element = document.createElement('div');
            this.element.style.cssText = `
                padding: 20px;
                background: #f5f5f5;
                border: 1px solid #ddd;
                font-family: monospace;
                color: #666;
                text-align: center;
            `;
            this.element.innerHTML = `
                <h3>🔄 Monaco Editor Loading...</h3>
                <p>Please wait while the modern editor loads.</p>
                <p><small>Loading VS Code-like editor with modern JavaScript support...</small></p>
                <div style="margin-top: 10px;">
                    <button onclick="location.reload()" style="padding: 5px 10px;">Refresh Page</button>
                </div>
            `;
            
            if (typeof container === 'function') {
                container(this.element);
            } else {
                container.appendChild(this.element);
            }
        }
        
        getDoc(): Doc {
            return {
                getValue: () => '',
                setValue: () => {},
                getLine: () => '',
                markText: () => ({ clear: () => {}, find: () => null, getOptions: () => ({}) }),
                getCursor: () => ({ line: 0, ch: 0 }),
                replaceRange: () => {},
                undo: () => {}
            };
        }
        
        setSize(): void {}
        refresh(): void {}
        focus(): void {}
    }

}
