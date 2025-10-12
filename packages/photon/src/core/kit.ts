import { IModel } from './schema.js';
import type { IKit } from './maker.js';

/** Helper function to use the JavaScript "apply" function in conjunction with the "new" keyword. */
export function construct(ctor: IKit, args): IModel {
    function F(): void {
        return ctor.apply(this, args);
    }
    F.prototype = ctor.prototype;
    return new F();
}

/** Extract just the initial sample values from a kit. */
export function getParameterValues(ctor: IKit): any[] {
    const parameters = [];
    const metaParams = ctor.metaParameters;
    if (metaParams) {
        for (let i = 0; i < metaParams.length; i++) {
            let value = metaParams[i].value;
            if (Array.isArray(value)) {
                value = value[0];
            }
            parameters.push(value);
        }
    }
    return parameters;
}

