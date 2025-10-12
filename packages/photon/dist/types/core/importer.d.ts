/**
 * Create a numeric array from a string of numbers. The numbers may be delimited by anything non-numeric.
 *
 * Example:
 * ```
 * var n = makerjs.importer.parseNumericList('5, 10, 15.20 25-30-35 4e1 .5');
 * ```
 *
 * @param s The string of numbers.
 * @returns Array of numbers.
 */
export declare function parseNumericList(s: string): number[];
