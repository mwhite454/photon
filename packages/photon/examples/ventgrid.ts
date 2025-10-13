///<reference path="../target/ts/photon.d.ts"/>

import * as photon from 'photon';
const Photon = photon as any as typeof MakerJs;

class Ventgrid implements MakerJs.IModel {
		
	public units = photon.unitType.Millimeter;
    public paths: MakerJs.IPathMap = {};
	
	constructor(public filterRadius: number, public spacing: number, public width: number, public height: number) {
		
		let alternate = false;
		const xDistance = 2 * filterRadius * (1 + spacing / 100);
		const countX = Math.ceil(width / xDistance);
		const yDistance = photon.tools.solveTriangleASA(60, xDistance / 2, 90);
		const countY = Math.ceil(height / yDistance) + 1;
		
		function checkBoundary(x: number, y: number) : boolean {		
			return y - filterRadius < height && x - filterRadius < width;
		}

		const row = (iy: number) => {
			
			let total = countX;
			if (!alternate) {
				total++;
			}
			
			for (let i = 0; i < total; i++) {
				let x = i * xDistance;
				const y = iy * yDistance;
				
				if (alternate) {
					x += xDistance / 2;
				}
				
                if (checkBoundary(Math.abs(x), Math.abs(y))) {

                    const id = 'filter_' + i + '_' + iy;

                    this.paths[id] = new photon.paths.Circle([x, y], filterRadius);
					
					if (alternate || (!alternate && i > 0)) {
                        this.paths[id + '_alt'] = new photon.paths.Circle([-x, y], filterRadius);
					}
				}
			}
		};
		
		for (let i = 0; i < countY; i++) {
			row(i);
			
			if (i > 0) {
				row(-i);
			}
			
			alternate = !alternate;
		}
		
	}
	
}

(<MakerJs.kit.IKit>Ventgrid).metaParameters = [
    { title: "filterRadius", type: "range", min: 1, max: 20, value: 2 },
	{ title: "spacing", type: "range", min: 10, max: 100, value: 49 },
	{ title: "width", type: "range", min: 20, max: 200, value: 37 },
	{ title: "height", type: "range", min: 20, max: 200, value: 50 },
];

export default Ventgrid;

  //To compile this: go to the root and:

  // cd examples
  // tsc ventgrid.ts --declaration

