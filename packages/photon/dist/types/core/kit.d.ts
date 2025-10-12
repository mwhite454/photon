import { IModel } from './schema.js';
import type { IKit } from './maker.js';
/** Helper function to use the JavaScript "apply" function in conjunction with the "new" keyword. */
export declare function construct(ctor: IKit, args: any): IModel;
/** Extract just the initial sample values from a kit. */
export declare function getParameterValues(ctor: IKit): any[];
