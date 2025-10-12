import { pathType, round, isNumber, isPoint } from './maker.js';
import * as point from './point.js';
import * as angle from './angle.js';
import * as path from './path.js';
import { intersection } from './intersect.js';
import * as measure from './measure.js';
const distance2D = (a, b) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    return Math.sqrt(dx * dx + dy * dy);
};
/** Class for arc path. */
export class Arc {
    constructor(...args) {
        var _a, _b;
        function getSpan(origin) {
            var startAngle = angle.ofPointInDegrees(origin, args[clockwise ? 1 : 0]);
            var endAngle = angle.ofPointInDegrees(origin, args[clockwise ? 0 : 1]);
            if (endAngle < startAngle) {
                endAngle += 360;
            }
            return {
                origin: origin,
                startAngle: startAngle,
                endAngle: endAngle,
                size: endAngle - startAngle
            };
        }
        switch (args.length) {
            case 5:
                //SVG style arc designation
                var pointA = args[0];
                var pointB = args[1];
                this.radius = args[2];
                var largeArc = args[3];
                var clockwise = args[4];
                var span;
                //make sure arc can reach. if not, scale up.
                var smallestRadius = distance2D(pointA, pointB) / 2;
                if (round(this.radius - smallestRadius) <= 0) {
                    this.radius = smallestRadius;
                    span = getSpan(point.average(pointA, pointB));
                }
                else {
                    //find the 2 potential origins
                    let intersectionPoints = (_b = (_a = intersection(new Circle(pointA, this.radius), new Circle(pointB, this.radius))) === null || _a === void 0 ? void 0 : _a.intersectionPoints) !== null && _b !== void 0 ? _b : [pointA, pointB];
                    var spans = [];
                    for (var i = intersectionPoints.length; i--;) {
                        span = getSpan(intersectionPoints[i]);
                        //insert sorted by size ascending
                        if (spans.length == 0 || span.size > spans[0].size) {
                            spans.push(span);
                        }
                        else {
                            spans.unshift(span);
                        }
                    }
                    var index = largeArc ? 1 : 0;
                    span = spans[index];
                }
                this.origin = span.origin;
                this.startAngle = span.startAngle;
                this.endAngle = span.endAngle;
                break;
            case 4:
                this.origin = args[0];
                this.radius = args[1];
                this.startAngle = args[2];
                this.endAngle = args[3];
                break;
            case 3:
                if (isPoint(args[2])) {
                    //from 3 points
                    Circle.apply(this, args);
                    var angles = [];
                    for (let i = 0; i < 3; i++) {
                        angles.push(angle.ofPointInDegrees(this.origin, args[i]));
                    }
                    this.startAngle = angles[0];
                    this.endAngle = angles[2];
                    //swap start and end angles if this arc does not contain the midpoint
                    if (!measure.isBetweenArcAngles(angles[1], this, false)) {
                        this.startAngle = angles[2];
                        this.endAngle = angles[0];
                    }
                    //do not fall through if this was 3 points
                    break;
                }
            //fall through to below if 2 points
            case 2:
                //from 2 points (and optional clockwise flag)
                var clockwise = args[2];
                Circle.call(this, args[0], args[1]);
                this.startAngle = angle.ofPointInDegrees(this.origin, args[clockwise ? 1 : 0]);
                this.endAngle = angle.ofPointInDegrees(this.origin, args[clockwise ? 0 : 1]);
                break;
        }
        //do this after Circle.apply / Circle.call to make sure this is an arc
        this.type = pathType.Arc;
    }
}
/**
 * Class for circle path.
 */
export class Circle {
    constructor(...args) {
        this.type = pathType.Circle;
        switch (args.length) {
            case 1:
                this.origin = [0, 0];
                this.radius = args[0];
                break;
            case 2:
                if (isNumber(args[1])) {
                    this.origin = args[0];
                    this.radius = args[1];
                }
                else {
                    //Circle from 2 points
                    this.origin = point.average(args[0], args[1]);
                    this.radius = distance2D(this.origin, args[0]);
                }
                break;
            default:
                //Circle from 3 points
                //create 2 lines with 2nd point in common
                var lines = [
                    new Line(args[0], args[1]),
                    new Line(args[1], args[2])
                ];
                //create perpendicular lines
                var perpendiculars = [];
                for (var i = 2; i--;) {
                    var midpoint = point.middle(lines[i]);
                    perpendiculars.push(path.rotate(lines[i], 90, midpoint));
                }
                //find intersection of slopes of perpendiculars
                var origin = point.fromSlopeIntersection(perpendiculars[0], perpendiculars[1]);
                if (origin) {
                    this.origin = origin;
                    //radius is distance to any of the 3 points
                    this.radius = measure.pointDistance(this.origin, args[0]);
                }
                else {
                    throw 'invalid parameters - attempted to construct a circle from 3 points on a line: ' + JSON.stringify(args);
                }
                break;
        }
    }
}
/**
 * Class for line path.
 */
export class Line {
    constructor(...args) {
        this.type = pathType.Line;
        switch (args.length) {
            case 1:
                var points = args[0];
                this.origin = points[0];
                this.end = points[1];
                break;
            case 2:
                this.origin = args[0];
                this.end = args[1];
                break;
        }
    }
}
/**
 * Class for chord, which is simply a line path that connects the endpoints of an arc.
 *
 * @param arc Arc to use as the basic for the chord.
 */
export class Chord {
    constructor(arc) {
        var arcPoints = point.fromArc(arc);
        this.type = pathType.Line;
        this.origin = arcPoints[0];
        this.end = arcPoints[1];
    }
}
/**
 * Class for a parallel line path.
 *
 * @param toLine A line to be parallel to.
 * @param distance Distance between parallel and original line.
 * @param nearPoint Any point to determine which side of the line to place the parallel.
 */
export class Parallel {
    constructor(toLine, distance, nearPoint) {
        this.type = pathType.Line;
        this.origin = point.clone(toLine.origin);
        this.end = point.clone(toLine.end);
        var angleOfLine = angle.ofLineInDegrees(this);
        function getNewOrigin(offsetAngle) {
            var origin = point.add(toLine.origin, point.fromPolar(angle.toRadians(angleOfLine + offsetAngle), distance));
            return {
                origin: origin,
                nearness: distance2D(origin, nearPoint)
            };
        }
        var newOrigins = [getNewOrigin(-90), getNewOrigin(90)];
        var newOrigin = (newOrigins[0].nearness < newOrigins[1].nearness) ? newOrigins[0].origin : newOrigins[1].origin;
        path.move(this, newOrigin);
    }
}
//# sourceMappingURL=paths.js.map