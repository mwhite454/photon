class StringReader {
    constructor(complete) {
        this.complete = complete;
        this.data = [];
    }
    addListener(event, listener) {
        return this;
    }
    off(event, listener) {
        return this;
    }
    ;
    on(event, listener) {
        return this;
    }
    once(event, listener) {
        return this;
    }
    eventNames() {
        return [];
    }
    prependListener() {
        return this;
    }
    prependOnceListener() {
        return this;
    }
    rawListeners(event) {
        return [];
    }
    removeListener(event, listener) {
        return this;
    }
    removeAllListeners(event) {
        return this;
    }
    getMaxListeners() {
        return 1;
    }
    setMaxListeners(n) {
        return this;
    }
    listeners(event) {
        return [];
    }
    listenerCount(type) {
        return 1;
    }
    emit(event, ...args) {
        return true;
    }
    write(...any) {
        var string = new TextDecoder("utf-8").decode(arguments[0]);
        this.data.push(string);
        return true;
    }
    end() {
        this.complete(this.data.join(''));
    }
}
//# sourceMappingURL=string-reader.js.map