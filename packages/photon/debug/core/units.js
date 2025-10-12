import { unitType } from './maker.js';
/** The base type is arbitrary. Other conversions are then based off of this. */
const base = unitType.Millimeter;
/** Table of conversions. Lazy load upon first conversion. */
let table;
/** Initialize all known conversions. */
function init() {
    addBaseConversion(unitType.Centimeter, 10);
    addBaseConversion(unitType.Meter, 1000);
    addBaseConversion(unitType.Inch, 25.4);
    addBaseConversion(unitType.Foot, 25.4 * 12);
}
/** Add a conversion, and its inversion. */
function addConversion(srcUnitType, destUnitType, value) {
    const row = (unitType) => {
        if (!table[unitType]) {
            table[unitType] = {};
        }
        return table[unitType];
    };
    row(srcUnitType)[destUnitType] = value;
    row(destUnitType)[srcUnitType] = 1 / value;
}
/** Add a conversion of the base unit. */
function addBaseConversion(destUnitType, value) {
    addConversion(destUnitType, base, value);
}
/** Get a conversion ratio between a source unit and a destination unit. */
export function conversionScale(srcUnitType, destUnitType) {
    if (srcUnitType == destUnitType) {
        return 1;
    }
    // Lazy load the table with initial conversions
    if (!table) {
        table = {};
        init();
    }
    // Look for a cached conversion in the table
    if (!table[srcUnitType][destUnitType]) {
        // Create a new conversion and cache it in the table
        addConversion(srcUnitType, destUnitType, table[srcUnitType][base] * table[base][destUnitType]);
    }
    return table[srcUnitType] && table[srcUnitType][destUnitType];
}
/** Check to see if unit type is a valid Maker.js unit. */
export function isValidUnit(tryUnit) {
    for (const id in unitType) {
        if (unitType[id] == tryUnit) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=units.js.map