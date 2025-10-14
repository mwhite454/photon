/**
 * Monaco Editor Adapter for Maker.js Playground
 * Provides a compatibility layer to replace CodeMirror with Monaco Editor
 */
var MonacoEditorAdapter;
(function (MonacoEditorAdapter_1) {
    class MonacoDoc {
        constructor(editor) {
            this.editor = editor;
        }
        getValue() {
            return this.editor.getValue();
        }
        setValue(content) {
            this.editor.setValue(content);
        }
        getLine(line) {
            const model = this.editor.getModel();
            if (!model)
                return '';
            return model.getLineContent(line + 1); // Monaco uses 1-based line numbers
        }
        markText(from, to, options) {
            const model = this.editor.getModel();
            if (!model) {
                return {
                    clear: () => { },
                    find: () => null,
                    getOptions: () => options
                };
            }
            const monacoInstance = window.monaco || monaco;
            const range = new monacoInstance.Range(from.line + 1, from.ch + 1, to.line + 1, to.ch + 1);
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
        getCursor() {
            const position = this.editor.getPosition();
            if (!position)
                return { line: 0, ch: 0 };
            return {
                line: position.lineNumber - 1, // Convert to 0-based
                ch: position.column - 1
            };
        }
        replaceRange(replacement, from, to) {
            const model = this.editor.getModel();
            if (!model)
                return;
            const endPos = to || from;
            const monacoInstance = window.monaco || monaco;
            const range = new monacoInstance.Range(from.line + 1, from.ch + 1, endPos.line + 1, endPos.ch + 1);
            this.editor.executeEdits('playground', [{
                    range: range,
                    text: replacement
                }]);
        }
        undo() {
            this.editor.trigger('playground', 'undo', null);
        }
    }
    class MonacoEditorAdapter {
        constructor(container, options) {
            this.keyBindings = {};
            // Create container element if a function is provided (CodeMirror style)
            let targetElement;
            if (typeof container === 'function') {
                targetElement = document.createElement('div');
                targetElement.style.width = '100%';
                targetElement.style.height = '100%';
                container(targetElement);
            }
            else {
                targetElement = container;
            }
            // Configure Monaco Editor
            const monacoOptions = {
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
            const monacoInstance = window.monaco || monaco;
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
        mapTheme(codeMirrorTheme) {
            switch (codeMirrorTheme) {
                case 'twilight':
                    return 'vs-dark';
                default:
                    return 'vs';
            }
        }
        setupKeyBindings() {
            Object.entries(this.keyBindings).forEach(([key, handler]) => {
                const keybinding = this.parseKeyBinding(key);
                if (keybinding) {
                    this.monacoEditor.addCommand(keybinding, handler);
                }
            });
        }
        parseKeyBinding(key) {
            // Convert CodeMirror key bindings to Monaco key codes
            switch (key) {
                case 'Ctrl-Enter':
                    const monacoInstance = window.monaco || monaco;
                    return monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter;
                case 'Ctrl-I':
                    const monacoInstance2 = window.monaco || monaco;
                    return monacoInstance2.KeyMod.CtrlCmd | monacoInstance2.KeyCode.KeyI;
                default:
                    return null;
            }
        }
        addErrorStyles() {
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
        getDoc() {
            return this.doc;
        }
        setSize(width, height) {
            const container = this.monacoEditor.getContainerDomNode();
            if (width !== null) {
                container.style.width = typeof width === 'number' ? `${width}px` : width;
            }
            if (height !== null) {
                container.style.height = typeof height === 'number' ? `${height}px` : height;
            }
            this.monacoEditor.layout();
        }
        refresh() {
            this.monacoEditor.layout();
        }
        focus() {
            this.monacoEditor.focus();
        }
        dispose() {
            this.monacoEditor.dispose();
        }
    }
    // Export a factory function that matches CodeMirror's API
    function createEditor(container, options) {
        // Check if Monaco is available (check both global and window)
        const windowMonaco = window.monaco;
        const monacoAvailable = typeof monaco !== 'undefined' || typeof windowMonaco !== 'undefined';
        if (!monacoAvailable) {
            console.warn('Monaco Editor is not loaded yet. Showing fallback editor...');
            console.log('Window monaco:', typeof windowMonaco);
            console.log('Global monaco:', typeof monaco);
            console.log('Monaco loaded flag:', window.monacoLoaded);
            // Return a fallback editor that shows an error message
            return new FallbackEditor(container, options);
        }
        // Use window.monaco if global monaco is not available
        if (typeof monaco === 'undefined' && typeof windowMonaco !== 'undefined') {
            // Make window.monaco available as global monaco for our adapter
            globalThis.monaco = windowMonaco;
        }
        console.log('Monaco Editor is available, creating editor...');
        return new MonacoEditorAdapter(container, options);
    }
    MonacoEditorAdapter_1.createEditor = createEditor;
    // Fallback editor for when Monaco isn't loaded
    class FallbackEditor {
        constructor(container, options) {
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
            }
            else {
                container.appendChild(this.element);
            }
        }
        getDoc() {
            return {
                getValue: () => '',
                setValue: () => { },
                getLine: () => '',
                markText: () => ({ clear: () => { }, find: () => null, getOptions: () => ({}) }),
                getCursor: () => ({ line: 0, ch: 0 }),
                replaceRange: () => { },
                undo: () => { }
            };
        }
        setSize() { }
        refresh() { }
        focus() { }
    }
})(MonacoEditorAdapter || (MonacoEditorAdapter = {}));
//# sourceMappingURL=monaco-editor-adapter.js.map