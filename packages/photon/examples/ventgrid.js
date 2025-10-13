///<reference path="../target/ts/photon.d.ts"/>
import * as photon from 'photon';
const Ventgrid = (function () {
    function Ventgrid(filterRadius, spacing, width, height) {
       const _this = this;
        this.filterRadius = filterRadius;
        this.spacing = spacing;
        this.width = width;
        this.height = height;
        this.units = photon.unitType.Millimeter;
        this.paths = {};
       const alternate = false;
       const xDistance = 2 * filterRadius * (1 + spacing / 100);
       const countX = Math.ceil(width / xDistance);
       const yDistance = photon.solvers.solveTriangleASA(60, xDistance / 2, 90);
       const countY = Math.ceil(height / yDistance) + 1;
        function checkBoundary(x, y) {
            return y - filterRadius < height && x - filterRadius < width;
        }
       const row = function (iy) {
           const total = countX;
            if (!alternate) {
                total++;
            }
            for (var i = 0; i < total; i++) {
               const x = i * xDistance;
               const y = iy * yDistance;
                if (alternate) {
                    x += xDistance / 2;
                }
                if (checkBoundary(Math.abs(x), Math.abs(y))) {
                   const id = 'filter_' + i + '_' + iy;
                    _this.paths[id] = new photon.paths.Circle([x, y], filterRadius);
                    if (alternate || (!alternate && i > 0)) {
                        _this.paths[id + '_alt'] = new photon.paths.Circle([-x, y], filterRadius);
                    }
                }
            }
        };
        for (var i = 0; i < countY; i++) {
            row(i);
            if (i > 0) {
                row(-i);
            }
            alternate = !alternate;
        }
    }
    return Ventgrid;
})();
Ventgrid.metaParameters = [
    { title: "filterRadius", type: "range", min: 1, max: 20, value: 2 },
    { title: "spacing", type: "range", min: 10, max: 100, value: 49 },
    { title: "width", type: "range", min: 20, max: 200, value: 37 },
    { title: "height", type: "range", min: 20, max: 200, value: 50 },
];
export default Ventgrid;
//To compile this: go to the root and:
// cd examples
// tsc ventgrid.ts --declaration
