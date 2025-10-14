// FontLoader class for managing font loading
export class FontLoader {
    constructor(fontDir, opentype, metaParameters, paramValues) {
        this.fontDir = fontDir;
        this.opentype = opentype;
        this.fontParameters = {};
        this.fontRefs = 0;
        this.fontsLoaded = 0;
        this.paramValues = paramValues;
        this.baseUrl = fontDir;
        this.opentypeLib = opentype;
        if (metaParameters) {
            metaParameters.forEach((metaParameter, i) => {
                if (metaParameter.type !== 'font')
                    return;
                this.fontRefs++;
                var id = paramValues[i];
                if (id in this.fontParameters) {
                    this.fontParameters[id].paramIndexes.push(i);
                }
                else {
                    this.fontParameters[id] = { paramIndexes: [i] };
                }
            });
        }
    }
    static getConstraints(spec) {
        const specs = spec.split(' ');
        const add = [];
        const remove = [];
        specs.forEach(s => {
            if (!s)
                return;
            if (s[0] === '!') {
                remove.push(s.substring(2));
            }
            else if (s === '*') {
                add.push(s);
            }
            else {
                add.push(s.substring(1));
            }
        });
        return { add, remove };
    }
    static hasTags(font, tags) {
        for (var i = 0; i < tags.length; i++) {
            if (tags[i] === '*')
                return true;
            if (font.tags.indexOf(tags[i]) >= 0)
                return true;
        }
    }
    static fontMatches(font, spec) {
        const constraints = FontLoader.getConstraints(spec);
        if (FontLoader.hasTags(font, constraints.remove))
            return false;
        return FontLoader.hasTags(font, constraints.add);
    }
    findFirstFontIdMatching(spec) {
        for (const fontId in playgroundFonts) {
            const font = playgroundFonts[fontId];
            if (FontLoader.fontMatches(font, spec))
                return fontId;
        }
        return null;
    }
    getParamValuesWithFontSpec() {
        if (this.fontRefs === 0) {
            return this.paramValues;
        }
        else {
            this.paramValuesCopy = this.paramValues.slice(0);
            for (const spec in this.fontParameters) {
                const firstFont = this.findFirstFontIdMatching(spec);
                //substitute font ids with fonts
                this.fontParameters[spec].paramIndexes.forEach(index => this.paramValuesCopy[index] = firstFont);
            }
            return this.paramValuesCopy;
        }
    }
    load() {
        if (this.fontRefs === 0) {
            this.successCb(this.paramValues);
        }
        else {
            this.paramValuesCopy = this.paramValues.slice(0);
            for (const fontId in this.fontParameters) {
                this.loadFont(fontId);
            }
        }
    }
    loaded() {
        this.fontsLoaded++;
        if (this.fontsLoaded === this.fontRefs) {
            this.successCb(this.paramValuesCopy);
        }
    }
    loadFont(fontId) {
        //load a font asynchronously
        this.opentypeLib.load(this.baseUrl + playgroundFonts[fontId].path, (err, font) => {
            if (err) {
                this.failureCb(fontId);
            }
            else {
                //substitute font ids with fonts
                this.fontParameters[fontId].font = font;
                this.fontParameters[fontId].paramIndexes.forEach(index => this.paramValuesCopy[index] = font);
                this.loaded();
            }
        });
    }
}
//# sourceMappingURL=fontloader.js.map