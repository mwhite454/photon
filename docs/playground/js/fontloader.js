"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontLoader = void 0;
// FontLoader class for managing font loading
var FontLoader = /** @class */ (function () {
    function FontLoader(fontDir, opentype, metaParameters, paramValues) {
        var _this = this;
        this.fontDir = fontDir;
        this.opentype = opentype;
        this.fontParameters = {};
        this.fontRefs = 0;
        this.fontsLoaded = 0;
        this.paramValues = paramValues;
        this.baseUrl = fontDir;
        this.opentypeLib = opentype;
        if (metaParameters) {
            metaParameters.forEach(function (metaParameter, i) {
                if (metaParameter.type !== 'font')
                    return;
                _this.fontRefs++;
                var id = paramValues[i];
                if (id in _this.fontParameters) {
                    _this.fontParameters[id].paramIndexes.push(i);
                }
                else {
                    _this.fontParameters[id] = { paramIndexes: [i] };
                }
            });
        }
    }
    FontLoader.getConstraints = function (spec) {
        var specs = spec.split(' ');
        var add = [];
        var remove = [];
        specs.forEach(function (s) {
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
        return { add: add, remove: remove };
    };
    FontLoader.hasTags = function (font, tags) {
        for (var i = 0; i < tags.length; i++) {
            if (tags[i] === '*')
                return true;
            if (font.tags.indexOf(tags[i]) >= 0)
                return true;
        }
    };
    FontLoader.fontMatches = function (font, spec) {
        var constraints = FontLoader.getConstraints(spec);
        if (FontLoader.hasTags(font, constraints.remove))
            return false;
        return FontLoader.hasTags(font, constraints.add);
    };
    FontLoader.prototype.findFirstFontIdMatching = function (spec) {
        for (var fontId in playgroundFonts) {
            var font = playgroundFonts[fontId];
            if (FontLoader.fontMatches(font, spec))
                return fontId;
        }
        return null;
    };
    FontLoader.prototype.getParamValuesWithFontSpec = function () {
        var _this = this;
        if (this.fontRefs === 0) {
            return this.paramValues;
        }
        else {
            this.paramValuesCopy = this.paramValues.slice(0);
            var _loop_1 = function (spec) {
                var firstFont = this_1.findFirstFontIdMatching(spec);
                //substitute font ids with fonts
                this_1.fontParameters[spec].paramIndexes.forEach(function (index) { return _this.paramValuesCopy[index] = firstFont; });
            };
            var this_1 = this;
            for (var spec in this.fontParameters) {
                _loop_1(spec);
            }
            return this.paramValuesCopy;
        }
    };
    FontLoader.prototype.load = function () {
        if (this.fontRefs === 0) {
            this.successCb(this.paramValues);
        }
        else {
            this.paramValuesCopy = this.paramValues.slice(0);
            for (var fontId in this.fontParameters) {
                this.loadFont(fontId);
            }
        }
    };
    FontLoader.prototype.loaded = function () {
        this.fontsLoaded++;
        if (this.fontsLoaded === this.fontRefs) {
            this.successCb(this.paramValuesCopy);
        }
    };
    FontLoader.prototype.loadFont = function (fontId) {
        var _this = this;
        //load a font asynchronously
        this.opentypeLib.load(this.baseUrl + playgroundFonts[fontId].path, function (err, font) {
            if (err) {
                _this.failureCb(fontId);
            }
            else {
                //substitute font ids with fonts
                _this.fontParameters[fontId].font = font;
                _this.fontParameters[fontId].paramIndexes.forEach(function (index) { return _this.paramValuesCopy[index] = font; });
                _this.loaded();
            }
        });
    };
    return FontLoader;
}());
exports.FontLoader = FontLoader;
//# sourceMappingURL=fontloader.js.map