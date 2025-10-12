import type { IModel, IModelMap } from '../core/schema.js';
export declare class Text implements IModel {
    models: IModelMap;
    /**
     * Renders text in a given font to a model.
     * @param font OpenType.Font object.
     * @param text String of text to render.
     * @param fontSize Font size.
     * @param combine Flag (default false) to perform a combineUnion upon each character with characters to the left and right.
     * @param centerCharacterOrigin Flag (default false) to move the x origin of each character to the center. Useful for rotating text characters.
     * @param bezierAccuracy Optional accuracy of Bezier curves.
     * @param opentypeOptions Optional opentype.RenderOptions object.
     * @returns Model of the text.
     */
    constructor(font: opentype.Font, text: string, fontSize: number, combine?: boolean, centerCharacterOrigin?: boolean, bezierAccuracy?: number, opentypeOptions?: opentype.RenderOptions);
    /**
     * Convert an opentype glyph to a model.
     * @param glyph Opentype.Glyph object.
     * @param fontSize Font size.
     * @param bezierAccuracy Optional accuracy of Bezier curves.
     * @returns Model of the glyph.
     */
    static glyphToModel(glyph: opentype.Glyph, fontSize: number, bezierAccuracy?: number): IModel;
}
