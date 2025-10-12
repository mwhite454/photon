"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var change_case_1 = require("change-case");
var sort_keys_1 = require("sort-keys");
var fontRoot = "../../docs/fonts/";
var tags = JSON.parse(fs.readFileSync(path.join(fontRoot, "tags.json"), "utf8"));
var out = {};
var dirs = fs.readdirSync(fontRoot).filter(function (file) {
    return fs.statSync(path.join(fontRoot, file)).isDirectory();
});
dirs.forEach(function (dir) {
    var ext = '.ttf';
    var fonts = fs.readdirSync(path.join(fontRoot, dir)).filter(function (file) {
        return path.extname(file).toLowerCase() === ext;
    });
    fonts.forEach(function (font) {
        var name = font.substring(0, font.length - ext.length);
        var display = (0, change_case_1.capitalCase)(name.replace(/-regular/i, '').replace('-', ''));
        var key = name.toLowerCase();
        out[key] = { displayName: display, path: [dir, font].join('/') };
    });
});
function write(fileName, content) {
    var fd = fs.openSync(path.join(fontRoot, fileName), 'w');
    fs.writeSync(fd, content);
    fs.closeSync(fd);
}
var sorted = (0, sort_keys_1.default)(out, {
    compare: function (a, b) { return out[a].displayName.localeCompare(out[b].displayName); }
});
for (var id in sorted) {
    if (!Object.prototype.hasOwnProperty.call(sorted, id))
        continue;
    sorted[id].tags = (_a = tags[id]) !== null && _a !== void 0 ? _a : [];
}
var json = JSON.stringify(sorted, null, '  ');
write('fonts.js', 'var playgroundFonts = ' + json + '\n');
console.log('playgroundFonts written successfully');
