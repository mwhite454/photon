/** Class for an XML tag. */
export class XmlTag {
    /** Escapes certain characters within a string so that it can appear in a tag or its attribute. */
    static escapeString(value) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;'
        };
        for (const code in escape) {
            // .split then .join is a 'replace'
            value = value.split(code).join(escape[code]);
        }
        return value;
    }
    constructor(name, attrs) {
        this.name = name;
        this.attrs = attrs;
        /** Text between the opening and closing tags. */
        this.innerText = '';
    }
    /** Get the opening tag. */
    getOpeningTag(selfClose) {
        let attrs = '';
        const outputAttr = (attrName, attrValue) => {
            if (attrValue == null || typeof attrValue === 'undefined')
                return;
            if (Array.isArray(attrValue) || typeof attrValue === 'object') {
                attrValue = JSON.stringify(attrValue);
            }
            if (typeof attrValue === 'string') {
                attrValue = XmlTag.escapeString(attrValue);
            }
            attrs += ' ' + attrName + '="' + attrValue + '"';
        };
        for (const name in this.attrs) {
            outputAttr(name, this.attrs[name]);
        }
        return '<' + this.name + attrs + (selfClose ? '/' : '') + '>';
    }
    /** Get the inner text. */
    getInnerText() {
        if (this.innerTextEscaped) {
            return this.innerText;
        }
        else {
            return XmlTag.escapeString(this.innerText);
        }
    }
    /** Get the closing tag. */
    getClosingTag() {
        return '</' + this.name + '>';
    }
    /** Output the entire tag as a string. */
    toString() {
        const selfClose = !this.innerText;
        if (selfClose && !this.closingTags) {
            return this.getOpeningTag(true);
        }
        else {
            return this.getOpeningTag(false) + this.getInnerText() + this.getClosingTag();
        }
    }
}
//# sourceMappingURL=xml.js.map