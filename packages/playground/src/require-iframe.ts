// @ts-nocheck
// Define IJavaScriptErrorDetails inline to avoid module imports
interface IJavaScriptErrorDetails {
    name: string;
    message: string;
    lineno: number;
    colno: number;
}

// Extend Window interface for iframe context
declare global {
    // @ts-ignore - Window extensions for iframe context
    interface Window {
        collectRequire: NodeRequireFunction;
        require: NodeRequireFunction;
        module: NodeModule;
        PhotonPlayground: any;    //this is not in this window but it is in the parent
        makerjs: any;
        playgroundRender: Function;
        paramValues: any[];
    }
}

// Internal interfaces
interface IRequireMap {
    [id: string]: any;
}

interface IStringMap {
    [id: string]: string;
}

// Counter class for tracking async loads
class Counter {
    public required = 0;
    public loaded = 0;
    public complete = function () { };

    public addLoaded() {
        this.loaded++;

        if (this.loaded == this.required) {
            this.complete();
        }
    }

    public reset() {
        this.required = 0;
        this.loaded = 0;
    }
}

// Temporary class for require placeholders
class Temp {
}

// Run code in isolated scope
const runCodeIsolated = (javaScript: string) => {
    const mockDocument = {
        write: devNull
    };
    const Fn: any = new Function('require', 'module', 'document', 'console', 'alert', 'playgroundRender', javaScript);
    const result: any = new Fn(window.require, window.module, mockDocument, (<Window & typeof globalThis>(parent)).console, devNull, devNull); //call function with the "new" keyword so the "this" keyword is an instance

    return window.module.exports || result;
};

// Run code in global scope
const runCodeGlobal = (javaScript: string) => {
    const script: HTMLScriptElement = document.createElement('script');

    const fragment = document.createDocumentFragment();
    fragment.textContent = javaScript;

    script.appendChild(fragment);

    head.appendChild(script);
};

// Load a module script
const load = (id: string, requiredById: string) => {

    //bookkeeping
    if (!(id in loads)) {
        loads[id] = requiredById;
    }

    //first look for an existing node to reuse its src, so it loads from cache
    let script = document.getElementById(id) as HTMLScriptElement;
    let src: string;

    if (script) {
        src = script.src;
        head.removeChild(script);
    } else {
        src = parent.PhotonPlayground.filenameFromRequireId(id, true);
    }

    //always create a new element so it fires the onload event
    script = document.createElement('script');
    script.id = id;
    script.src = src;

    const timeout = setTimeout(() => {

        const errorDetails: IJavaScriptErrorDetails = {
            colno: 0,       //TBD we might be able to get this by parsing the code of loads[id] and searching for 'require'
            lineno: 0,
            message: 'Could not load module "' + id + '"' + (loads[id] ? ' required by "' + loads[id] + '"' : '') + '. Possibly a network error, or the file does not exist.',
            name: 'Load module failure'
        };

        //send error results back to parent window
        parent.PhotonPlayground.processResult({ result: errorDetails });

    }, 5000);

    script.onload = () => {

        clearTimeout(timeout);

        //save the required module
        required[id] = window.module.exports;

        //reset so it does not get picked up again
        window.module.exports = null;

        //increment the counter
        counter.addLoaded();
    };

    head.appendChild(script);
};

// Get console logs as HTML
const getLogsHtmls = () => {

    const logHtmls: string[] = [];

    if (logs.length > 0) {
        logHtmls.push('<div class="section"><div class="separator"><span class="console">console:</span></div>');

        logs.forEach((log) => {
            const logDiv = new makerjs.exporter.XmlTag('div', { "class": "console" });
            logDiv.innerText = log;
            logHtmls.push(logDiv.toString());
        });
        logHtmls.push('</div>');
    }

    return logHtmls;
};

// Get all HTML output
const getHtml = () => {
    return htmls.concat(getLogsHtmls()).join('');
};

// Reset HTML and log buffers
const resetLog = () => {
    htmls = [];
    logs = [];
};

// Module state
let head: HTMLHeadElement;
const loads: IStringMap = {};
const reloads: string[] = [];
let previousId: string = null;
let collection = true;
const counter = new Counter();
let htmls: string[] = [];
let logs: string[] = [];
let error: Error = null;
let errorReported = false;
const required: IRequireMap = {
    'makerjs': parent.makerjs,
    './../target/js/node.maker.js': parent.makerjs
};

// Override document.write
document.write = (html: string) => {
    htmls.push(html);
};

// Override console.log
console.log = (entry: any) => {
    switch (typeof entry) {

        case 'number':
            logs.push('' + entry);
            break;

        case 'string':
            logs.push(entry);
            break;

        default:
            logs.push(JSON.stringify(entry));
    }
};

// Global error handler
window.onerror = () => {
    const errorEvent = window.event as ErrorEvent;
    let errorName = 'Error';

    if (error && error.name) {
        errorName = error.name;
    }

    const errorDetails: IJavaScriptErrorDetails = {
        colno: errorEvent.colno,
        lineno: errorEvent.lineno,
        message: errorEvent.message,
        name: errorName
    };

    //send error results back to parent window
    parent.PhotonPlayground.processResult({ result: errorDetails });
    errorReported = true;
};

// Custom require function
window.require = ((id: string) => {

    if (collection && id === 'makerjs') {
        return mockMakerJs;
    }

    if (id in required) {
        //return cached required file
        return required[id];
    }

    counter.required++;

    if (previousId) {
        reloads.push(previousId);
    }

    load(id, previousId);

    previousId = id;

    //return an object that may be treated like a class
    return Temp;
}) as NodeRequire;

// Module exports object
window.module = { exports: null } as NodeModule;

// Window onload handler
window.onload = () => {
    head = document.getElementsByTagName('head')[0];

    //get the code from the editor
    const javaScript = parent.PhotonPlayground.codeMirrorEditor.getDoc().getValue();

    const originalAlert = window.alert;
    window.alert = devNull;

    //run the code in 2 passes, first - to cache all required libraries, secondly the actual execution

    const complete2 = () => {

        //reset any calls to document.write
        resetLog();

        //reinstate alert
        window.alert = originalAlert;

        const originalFn = parent.makerjs.exporter.toSVG;
        let captureExportedModel: any;

        parent.makerjs.exporter.toSVG = (itemToExport: any, options?: any): string => {

            if (parent.makerjs.maker.isModel(itemToExport)) {
                captureExportedModel = itemToExport;

            } else if (Array.isArray(itemToExport)) {
                captureExportedModel = {};

                itemToExport.forEach((x, i) => {
                    if (makerjs.maker.isModel(x)) {
                        captureExportedModel.models = captureExportedModel.models || {};
                        captureExportedModel.models[i] = x;
                    }
                    if (makerjs.maker.isPath(x)) {
                        captureExportedModel.paths = captureExportedModel.paths || {};
                        captureExportedModel.paths[i] = x;
                    }
                });


            } else if (parent.makerjs.maker.isPath(itemToExport)) {
                captureExportedModel = { paths: { "0": itemToExport } };
            }

            return originalFn(itemToExport, options);
        };

        //when all requirements are collected, run the code again, using its requirements
        runCodeGlobal(javaScript);

        parent.makerjs.exporter.toSVG = originalFn;

        if (errorReported) return;

        //yield thread for the script tag to execute
        setTimeout(() => {

            let model: any;

            if (captureExportedModel) {
                model = captureExportedModel;
            } else {

                //restore properties from the "this" keyword
                model = {};
                const props = ['layer', 'models', 'notes', 'origin', 'paths', 'type', 'units', 'caption', 'exporterOptions'];
                let hasProps = false;
                for (let i = 0; i < props.length; i++) {
                    const prop = props[i];
                    if (prop in window) {
                        model[prop] = window[prop];
                        hasProps = true;
                    }
                }

                if (!hasProps) {
                    model = null;
                }
            }

            const orderedDependencies: string[] = [];
            const scripts = head.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].hasAttribute('id')) {
                    orderedDependencies.push(scripts[i].id);
                }
            }

            //send results back to parent window
            parent.PhotonPlayground.processResult({ html: getHtml(), result: window.module.exports || model, orderedDependencies: orderedDependencies, paramValues: window.paramValues });

        }, 0);

    };

    const complete1 = () => {

        if (reloads.length) {
            counter.complete = complete2;

            counter.required += reloads.length;

            for (let i = reloads.length; i--;) {
                load(reloads[i], null);
            }

        } else {
            complete2();
        }
    };

    counter.complete = complete1;

    try {

        //run for the collection pass
        runCodeIsolated(javaScript);

    } catch (e) {

        //save the error
        error = e;

    }

    collection = false;

    //if there were no requirements, fire the complete function manually
    if (counter.required == 0) {
        counter.complete();
    }
};

// Playground render function
window.playgroundRender = (result) => {
    parent.PhotonPlayground.processResult({ html: getHtml(), result: result, paramValues: window.paramValues });
};

// Dev null function
const devNull = () => { };

// Mock MakerJs object
const mockMakerJs = {} as any;

// Walk and mock object structure
const mockWalk = (src: any, dest: any) => {

    for (const id in src) {

        switch (typeof src[id]) {

            case 'function':
                dest[id] = devNull;
                break;

            case 'object':
                dest[id] = {};
                mockWalk(src[id], dest[id]);
                break;

            default:
                dest[id] = src[id];
                break;
        }
    }
};

mockWalk(parent.makerjs, mockMakerJs);

// Main thread constructor for kit-based models
parent.PhotonPlayground.mainThreadConstructor = (kit: any, params: any) => {
    resetLog();
    return {
        model: parent.makerjs.kit.construct(kit, params),
        html: getHtml()
    };
}; 
