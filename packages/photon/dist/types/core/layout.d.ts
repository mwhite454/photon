import type { IPoint, IPath, IModel } from './schema.js';
import type { IChain } from './core.js';
/**
 * Layout the children of a model along a path.
 * The x-position of each child will be projected onto the path so that the proportion between children is maintained.
 * Each child will be rotated such that it will be perpendicular to the path at the child's x-center.
 *
 * @param parentModel The model containing children to lay out.
 * @param onPath The path on which to lay out.
 * @param baseline Numeric percentage value of vertical displacement from the path. Default is zero.
 * @param reversed Flag to travel along the path in reverse. Default is false.
 * @param contain Flag to contain the children layout within the length of the path. Default is false.
 * @param rotate Flag to rotate the child to perpendicular. Default is true.
 * @returns The parentModel, for cascading.
 */
export declare function childrenOnPath(parentModel: IModel, onPath: IPath, baseline?: number, reversed?: boolean, contain?: boolean, rotate?: boolean): IModel;
/**
 * Layout the children of a model along a chain.
 * The x-position of each child will be projected onto the chain so that the proportion between children is maintained.
 * The projected positions of the children will become an array of points that approximate the chain.
 * Each child will be rotated such that it will be mitered according to the vertex angles formed by this series of points.
 *
 * @param parentModel The model containing children to lay out.
 * @param onChain The chain on which to lay out.
 * @param baseline Numeric percentage value of vertical displacement from the chain. Default is zero.
 * @param reversed Flag to travel along the chain in reverse. Default is false.
 * @param contain Flag to contain the children layout within the length of the chain. Default is false.
 * @param rotate Flag to rotate the child to mitered angle. Default is true.
 * @returns The parentModel, for cascading.
 */
export declare function childrenOnChain(parentModel: IModel, onChain: IChain, baseline?: number, reversed?: boolean, contain?: boolean, rotated?: boolean): IModel;
/**
 * Layout clones in a radial format.
 *
 * Example:
 * ```
 * //daisy petals
 * import * as makerjs from 'maker.js';
 *
 * const belt = new makerjs.models.Belt(5, 50, 20);
 *
 * makerjs.model.move(belt, [25, 0]);
 *
 * const petals = makerjs.layout.cloneToRadial(belt, 8, 45);
 *
 * document.write(makerjs.exporter.toSVG(petals));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param count Number of clones in the radial result.
 * @param angleInDegrees angle of rotation between clones..
 * @returns A new model with clones in a radial format.
 */
export declare function cloneToRadial(itemToClone: IModel | IPath, count: number, angleInDegrees: number, rotationOrigin?: IPoint): IModel;
/**
 * Layout clones in a column format.
 *
 * Example:
 * ```
 * //Grooves for a finger joint
 * import * as makerjs from 'maker.js';
 *
 * const dogbone = new makerjs.models.Dogbone(50, 20, 2, -1, false);
 *
 * const grooves = makerjs.layout.cloneToColumn(dogbone, 5, 20);
 *
 * document.write(makerjs.exporter.toSVG(grooves));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param count Number of clones in the column.
 * @param margin Optional distance between each clone.
 * @returns A new model with clones in a column.
 */
export declare function cloneToColumn(itemToClone: IModel | IPath, count: number, margin?: number): IModel;
/**
 * Layout clones in a row format.
 *
 * Example:
 * ```
 * //Tongue and grooves for a box joint
 * import * as makerjs from 'maker.js';
 * const tongueWidth = 60;
 * const grooveWidth = 50;
 * const grooveDepth = 30;
 * const groove = new makerjs.models.Dogbone(grooveWidth, grooveDepth, 5, 0, true);
 *
 * groove.paths['leftTongue'] = new makerjs.paths.Line([-tongueWidth / 2, 0], [0, 0]);
 * groove.paths['rightTongue'] = new makerjs.paths.Line([grooveWidth, 0], [grooveWidth + tongueWidth / 2, 0]);
 *
 * const tongueAndGrooves = makerjs.layout.cloneToRow(groove, 3);
 *
 * document.write(makerjs.exporter.toSVG(tongueAndGrooves));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param count Number of clones in the row.
 * @param margin Optional distance between each clone.
 * @returns A new model with clones in a row.
 */
export declare function cloneToRow(itemToClone: IModel | IPath, count: number, margin?: number): IModel;
/**
 * Layout clones in a grid format.
 *
 * Example:
 * ```
 * //Grid of squares
 * import * as makerjs from 'maker.js';
 * const square = new makerjs.models.Square(43);
 * const grid = makerjs.layout.cloneToGrid(square, 5, 5, 7);
 * document.write(makerjs.exporter.toSVG(grid));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param xCount Number of columns in the grid.
 * @param yCount Number of rows in the grid.
 * @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
 * @returns A new model with clones in a grid layout.
 */
export declare function cloneToGrid(itemToClone: IModel | IPath, xCount: number, yCount: number, margin?: number | IPoint): IModel;
/**
 * Layout clones in a brick format. Alternating rows will have an additional item in each row.
 *
 * Examples:
 * ```
 * //Brick wall
 * import * as makerjs from 'maker.js';
 * const brick = new makerjs.models.RoundRectangle(50, 30, 4);
 * const wall = makerjs.layout.cloneToBrick(brick, 8, 6, 3);
 * document.write(makerjs.exporter.toSVG(wall));
 * ```
 *
 * ```
 * //Fish scales
 * import * as makerjs from 'maker.js';
 * const arc = new makerjs.paths.Arc([0, 0], 50, 20, 160);
 * const scales = makerjs.layout.cloneToBrick(arc, 8, 20);
 * document.write(makerjs.exporter.toSVG(scales));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param xCount Number of columns in the brick grid.
 * @param yCount Number of rows in the brick grid.
 * @param margin Optional numeric distance between each clone. Can also be a 2 dimensional array of numbers, to specify distances in x and y dimensions.
 * @returns A new model with clones in a brick layout.
 */
export declare function cloneToBrick(itemToClone: IModel | IPath, xCount: number, yCount: number, margin?: number | IPoint): IModel;
/**
 * Layout clones in a honeycomb format. Alternating rows will have an additional item in each row.
 *
 * Examples:
 * ```
 * //Honeycomb
 * import * as makerjs from 'maker.js';
 * const hex = new makerjs.models.Polygon(6, 50, 30);
 * const pattern = makerjs.layout.cloneToHoneycomb(hex, 8, 9, 10);
 * document.write(makerjs.exporter.toSVG(pattern));
 * ```
 *
 * @param itemToClone: Either a model or a path object.
 * @param xCount Number of columns in the honeycomb grid.
 * @param yCount Number of rows in the honeycomb grid.
 * @param margin Optional distance between each clone.
 * @returns A new model with clones in a honeycomb layout.
 */
export declare function cloneToHoneycomb(itemToClone: IModel | IPath, xCount: number, yCount: number, margin?: number): IModel;
