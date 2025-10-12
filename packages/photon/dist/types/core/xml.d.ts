/** Attributes for an XML tag. */
export interface IXmlTagAttrs {
    [name: string]: any;
}
/** Class for an XML tag. */
export declare class XmlTag {
    name: string;
    attrs?: IXmlTagAttrs;
    /** Text between the opening and closing tags. */
    innerText: string;
    /** Boolean to indicate that the innerText has been escaped. */
    innerTextEscaped: boolean;
    /** Flag to explicitly close XML tags. */
    closingTags?: boolean;
    /** Escapes certain characters within a string so that it can appear in a tag or its attribute. */
    static escapeString(value: string): string;
    constructor(name: string, attrs?: IXmlTagAttrs);
    /** Get the opening tag. */
    getOpeningTag(selfClose: boolean): string;
    /** Get the inner text. */
    getInnerText(): string;
    /** Get the closing tag. */
    getClosingTag(): string;
    /** Output the entire tag as a string. */
    toString(): string;
}
