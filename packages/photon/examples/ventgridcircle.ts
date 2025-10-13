///<reference path="../target/ts/photon.d.ts"/>
///<reference path="ventgrid.d.ts"/>

import * as photon from 'photon';
import ventgrid from './ventgrid.js';

class VentgridCircle implements MakerJs.IModel {
		
	public units = photon.unitType.Millimeter;
    public paths: MakerJs.IPathMap = {};
	private rim: MakerJs.IPathCircle;
	
	constructor(public filterRadius: number, public spacing: number, public radius: number) {
		
		this.rim = new photon.paths.Circle([0,0], radius);
		
	const ventgridInstance = new ventgrid(filterRadius, spacing, radius, radius);
		
		for (let id in ventgridInstance.paths) {
	const circle = <MakerJs.IPathCircle>ventgridInstance.paths[id];
			this.checkCircle(id, circle);
		}		
			
	}
	
	private checkCircle (id:string, circle: MakerJs.IPathCircle) {
	const distanceToCenter = photon.measure.pointDistance([0,0], circle.origin);
		
		if (photon.round(distanceToCenter + circle.radius) <= this.radius) {
			//inside
			this.paths[id] = circle;
			
		} else if (photon.round(distanceToCenter - circle.radius) > this.radius) {
			//outside, don't add
			
		} else {
			//border
	const arcIntersection = photon.tools.pathIntersection(circle, this.rim);
			
            if (arcIntersection && arcIntersection.path1Angles.length == 2) {
	const filterArc = new photon.paths.Arc(circle.origin, circle.radius, arcIntersection.path1Angles[1], arcIntersection.path1Angles[0]);
				this.paths[id] = filterArc;
				
	const rimArc = new photon.paths.Arc([0,0], this.radius, arcIntersection.path2Angles[0], arcIntersection.path2Angles[1]);
				this.paths[id + '_rim'] = rimArc;
			}
		}
	}
	
}

(<MakerJs.kit.IKit>VentgridCircle).metaParameters = [
    { title: "filterRadius", type: "range", min: 1, max: 20, value: 6 },
	{ title: "spacing", type: "range", min: 10, max: 100, value: 30 },
	{ title: "radius", type: "range", min: 20, max: 200, value: 100 }
];

export default = VentgridCircle;

 //To compile this: go to the root and:
 //   cd examples
 //   tsc ventgridcircle.ts
 //   cp ventgridcircle.js temp.js  
 //   browserify -r ./temp.js:ventgridcircle --exclude ../target/js/node.maker.js > ventgridcircle.js

