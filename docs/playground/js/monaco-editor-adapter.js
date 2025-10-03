/**
 * Monaco Editor Adapter for Maker.js Playground
 * Provides a compatibility layer to replace CodeMirror with Monaco Editor
 */
var MonacoEditorAdapter;
(function (MonacoEditorAdapter_1) {
    var MonacoDoc = /** @class */ (function () {
        function MonacoDoc(editor) {
            this.editor = editor;
        }
        MonacoDoc.prototype.getValue = function () {
            return this.editor.getValue();
        };
        MonacoDoc.prototype.setValue = function (content) {
            this.editor.setValue(content);
        };
        MonacoDoc.prototype.getLine = function (line) {
            var model = this.editor.getModel();
            if (!model)
                return '';
            return model.getLineContent(line + 1); // Monaco uses 1-based line numbers
        };
        MonacoDoc.prototype.markText = function (from, to, options) {
            var _this = this;
            var model = this.editor.getModel();
            if (!model) {
                return {
                    clear: function () { },
                    find: function () { return null; },
                    getOptions: function () { return options; }
                };
            }
            var monacoInstance = window.monaco || monaco;
            var range = new monacoInstance.Range(from.line + 1, from.ch + 1, to.line + 1, to.ch + 1);
            var decoration = this.editor.deltaDecorations([], [{
                    range: range,
                    options: {
                        className: options.className || 'monaco-error-decoration',
                        hoverMessage: { value: options.title || 'Error' },
                        inlineClassName: options.className || 'monaco-error-inline'
                    }
                }]);
            return {
                clear: function () {
                    _this.editor.deltaDecorations(decoration, []);
                },
                find: function () { return ({ from: from, to: to }); },
                getOptions: function () { return options; }
            };
        };
        MonacoDoc.prototype.getCursor = function () {
            var position = this.editor.getPosition();
            if (!position)
                return { line: 0, ch: 0 };
            return {
                line: position.lineNumber - 1,
                ch: position.column - 1
            };
        };
        MonacoDoc.prototype.replaceRange = function (replacement, from, to) {
            var model = this.editor.getModel();
            if (!model)
                return;
            var endPos = to || from;
            var monacoInstance = window.monaco || monaco;
            var range = new monacoInstance.Range(from.line + 1, from.ch + 1, endPos.line + 1, endPos.ch + 1);
            this.editor.executeEdits('playground', [{
                    range: range,
                    text: replacement
                }]);
        };
        MonacoDoc.prototype.undo = function () {
            this.editor.trigger('playground', 'undo', null);
        };
        return MonacoDoc;
    }());
    var MonacoEditorAdapter = /** @class */ (function () {
        function MonacoEditorAdapter(container, options) {
            this.keyBindings = {};
            // Create container element if a function is provided (CodeMirror style)
            var targetElement;
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
            var monacoOptions = {
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
            var monacoInstance = window.monaco || monaco;
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
        MonacoEditorAdapter.prototype.mapTheme = function (codeMirrorTheme) {
            switch (codeMirrorTheme) {
                case 'twilight':
                    return 'vs-dark';
                default:
                    return 'vs';
            }
        };
        MonacoEditorAdapter.prototype.setupKeyBindings = function () {
            var _this = this;
            Object.entries(this.keyBindings).forEach(function (_a) {
                var key = _a[0], handler = _a[1];
                var keybinding = _this.parseKeyBinding(key);
                if (keybinding) {
                    _this.monacoEditor.addCommand(keybinding, handler);
                }
            });
        };
        MonacoEditorAdapter.prototype.parseKeyBinding = function (key) {
            // Convert CodeMirror key bindings to Monaco key codes
            switch (key) {
                case 'Ctrl-Enter':
                    var monacoInstance = window.monaco || monaco;
                    return monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter;
                case 'Ctrl-I':
                    var monacoInstance2 = window.monaco || monaco;
                    return monacoInstance2.KeyMod.CtrlCmd | monacoInstance2.KeyCode.KeyI;
                default:
                    return null;
            }
        };
        MonacoEditorAdapter.prototype.addErrorStyles = function () {
            // Add CSS styles for error decorations
            var style = document.createElement('style');
            style.textContent = "\n            .monaco-error-decoration {\n                background-color: rgba(255, 0, 0, 0.2);\n                border-bottom: 2px wavy red;\n            }\n            .monaco-error-inline {\n                text-decoration: underline wavy red;\n            }\n        ";
            document.head.appendChild(style);
        };
        MonacoEditorAdapter.prototype.getDoc = function () {
            return this.doc;
        };
        MonacoEditorAdapter.prototype.setSize = function (width, height) {
            var container = this.monacoEditor.getContainerDomNode();
            if (width !== null) {
                container.style.width = typeof width === 'number' ? "".concat(width, "px") : width;
            }
            if (height !== null) {
                container.style.height = typeof height === 'number' ? "".concat(height, "px") : height;
            }
            this.monacoEditor.layout();
        };
        MonacoEditorAdapter.prototype.refresh = function () {
            this.monacoEditor.layout();
        };
        MonacoEditorAdapter.prototype.focus = function () {
            this.monacoEditor.focus();
        };
        MonacoEditorAdapter.prototype.dispose = function () {
            this.monacoEditor.dispose();
        };
        return MonacoEditorAdapter;
    }());
    // Export a factory function that matches CodeMirror's API
    function createEditor(container, options) {
        // Check if Monaco is available (check both global and window)
        var windowMonaco = window.monaco;
        var monacoAvailable = typeof monaco !== 'undefined' || typeof windowMonaco !== 'undefined';
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
    var FallbackEditor = /** @class */ (function () {
        function FallbackEditor(container, options) {
            this.element = document.createElement('div');
            this.element.style.cssText = "\n                padding: 20px;\n                background: #f5f5f5;\n                border: 1px solid #ddd;\n                font-family: monospace;\n                color: #666;\n                text-align: center;\n            ";
            this.element.innerHTML = "\n                <h3>\uD83D\uDD04 Monaco Editor Loading...</h3>\n                <p>Please wait while the modern editor loads.</p>\n                <p><small>Loading VS Code-like editor with modern JavaScript support...</small></p>\n                <div style=\"margin-top: 10px;\">\n                    <button onclick=\"location.reload()\" style=\"padding: 5px 10px;\">Refresh Page</button>\n                </div>\n            ";
            if (typeof container === 'function') {
                container(this.element);
            }
            else {
                container.appendChild(this.element);
            }
        }
        FallbackEditor.prototype.getDoc = function () {
            return {
                getValue: function () { return ''; },
                setValue: function () { },
                getLine: function () { return ''; },
                markText: function () { return ({ clear: function () { }, find: function () { return null; }, getOptions: function () { return ({}); } }); },
                getCursor: function () { return ({ line: 0, ch: 0 }); },
                replaceRange: function () { },
                undo: function () { }
            };
        };
        FallbackEditor.prototype.setSize = function () { };
        FallbackEditor.prototype.refresh = function () { };
        FallbackEditor.prototype.focus = function () { };
        return FallbackEditor;
    }());
})(MonacoEditorAdapter || (MonacoEditorAdapter = {}));
//# sourceMappingURL=monaco-editor-adapter.js.map