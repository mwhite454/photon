/**
 * Schema objects for Maker.js.
 * 
 */
// points

/**
 * An x-y point in a two-dimensional space.
 * Implemented as an array with 2 elements. The first element is x, the second element is y.
 */
export interface IPoint {
  [index: number]: number;
}

// paths

/** A line, curved line or other simple two dimensional shape. */
export interface IPath {
  /** The type of the path, e.g. "line", "circle", or "arc". These strings are enumerated in pathType. */
  type: string;
  /** The main point of reference for this path. */
  origin: IPoint;
  /** Optional layer of this path. */
  layer?: string;
}

/** A line path. */
export interface IPathLine extends IPath {
  /** The end point defining the line. The start point is the origin. */
  end: IPoint;
}

/** A circle path. */
export interface IPathCircle extends IPath {
  /** The radius of the circle. */
  radius: number;
}

/** An arc path. */
export interface IPathArc extends IPathCircle {
  /** The angle (in degrees) to begin drawing the arc, in polar (counter-clockwise) direction. */
  startAngle: number;
  /** The angle (in degrees) to end drawing the arc, in polar (counter-clockwise) direction. */
  endAngle: number;
}

/** A bezier seed defines the endpoints and control points of a bezier curve. */
export interface IPathBezierSeed extends IPathLine {
  /** The bezier control points. One point for quadratic, 2 points for cubic. */
  controls: IPoint[];
  /** T values of the parent if this is a child that represents a split. */
  parentRange?: IBezierRange;
}

/** Bezier t values for an arc path segment in a bezier curve. */
export interface IBezierRange {
  /** The bezier t-value at the starting point. */
  startT: number;
  /** The bezier t-value at the end point. */
  endT: number;
}

/** An arc path segment in a bezier curve. */
export interface IPathArcInBezierCurve extends IPath {
  bezierData: IBezierRange;
}

// captions

/** Text annotation, diplayable natively to the output format. */
export interface ICaption {
  /** Caption text. */
  text: string;
  /** Invisible line to which the text is aligned. */
  anchor: IPathLine;
}

// models

/** Path objects by id. */
export interface IPathMap {
  [id: string]: IPath | IPathArc | IPathCircle | IPathLine;
}

/** Model objects by id. */
export interface IModelMap {
  [id: string]: IModel;
}

/** A model is a composite object which may contain a map of paths, or a map of models recursively. */
export interface IModel {
  /** Optional origin location of this model. */
  origin?: IPoint;
  /** A model may want to specify its type, but this value is not employed yet. */
  type?: string;
  /** Optional map of path objects in this model. */
  paths?: IPathMap;
  /** Optional map of models within this model. */
  models?: IModelMap;
  /** Optional unit system of this model. See UnitType for possible values. */
  units?: string;
  /** An author may wish to add notes to this model instance. */
  notes?: string;
  /** Optional layer of this model. */
  layer?: string;
  /** Optional Caption object. */
  caption?: ICaption;
  /** Optional exporter options for this model. */
  exporterOptions?: { [exporterName: string]: any };
}

// intersections

/** An intersection of two paths. */
export interface IPathIntersection {
  /** The points of intersection. */
  intersectionPoints: IPoint[];
  /** The angle of the first path at the point of intersection. */
  path1Angles?: number[];
  /** The angle of the second path at the point of intersection. */
  path2Angles?: number[];
}

/** Options for path intersection. */
export interface IPathIntersectionOptions {
  /** Optional boolean to only return deep intersections, i.e. not tangent. */
  excludeTangents?: boolean;
  /** Optional output variable which will be true if the paths are overlapped. */
  out_AreOverlapped?: boolean;
  /** Optional offset of the first path. */
  path1Offset?: IPoint;
  /** Optional offset of the second path. */
  path2Offset?: IPoint;
}

// TEMP: Provide legacy global namespace type aliases during migration
declare global {
  namespace Photon {
    type IPoint = import('./schema').IPoint;
    type IPath = import('./schema').IPath;
    type IPathLine = import('./schema').IPathLine;
    type IPathCircle = import('./schema').IPathCircle;
    type IPathArc = import('./schema').IPathArc;
    type IPathBezierSeed = import('./schema').IPathBezierSeed;
    type IBezierRange = import('./schema').IBezierRange;
    type IPathArcInBezierCurve = import('./schema').IPathArcInBezierCurve;
    type ICaption = import('./schema').ICaption;
    type IPathMap = import('./schema').IPathMap;
    type IModelMap = import('./schema').IModelMap;
    type IModel = import('./schema').IModel;
    type IPathIntersection = import('./schema').IPathIntersection;
    type IPathIntersectionOptions = import('./schema').IPathIntersectionOptions;
  }
}
