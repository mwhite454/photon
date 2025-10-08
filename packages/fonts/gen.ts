import * as fs from "fs";
import * as path from "path";
import { capitalCase } from "change-case";

import sortKeys from "sort-keys";
const fontRoot = "../../docs/fonts/";
const tags: Record<string, string[]> = JSON.parse(
    fs.readFileSync(path.join(fontRoot, "tags.json"), "utf8")
);

const out: Record<string, { displayName: string; path: string; tags?: unknown }> = {};

const dirs = fs.readdirSync(fontRoot).filter(function (file) {
    return fs.statSync(path.join(fontRoot, file)).isDirectory();
});

dirs.forEach(function (dir) {
    const ext = '.ttf';

    const fonts = fs.readdirSync(path.join(fontRoot, dir)).filter(function (file) {
        return path.extname(file).toLowerCase() === ext;
    });

    fonts.forEach(function (font) {
        const name = font.substring(0, font.length - ext.length);
        const display = capitalCase(name.replace(/-regular/i, '').replace('-', ''));
        const key = name.toLowerCase();
        out[key] = { displayName: display, path: [dir, font].join('/') };
    });
})

function write(fileName, content) {
    const fd = fs.openSync(path.join(fontRoot, fileName), 'w');
    fs.writeSync(fd, content);
    fs.closeSync(fd);
}

const sorted = sortKeys(out, {
    compare: (a, b) => out[a].displayName.localeCompare(out[b].displayName)
});

for (const id in sorted) {
    if (!Object.prototype.hasOwnProperty.call(sorted, id)) continue;
    sorted[id].tags = tags[id] ?? [];
}

const json = JSON.stringify(sorted, null, '  ');

write('fonts.js', 'var playgroundFonts = ' + json + '\n');

console.log('playgroundFonts written successfully')