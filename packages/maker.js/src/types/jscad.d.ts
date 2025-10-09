/**
 * Type definitions for @jscad/csg library
 * These ambient declarations allow TypeScript to understand the JSCAD API
 * without requiring the actual library at compile time.
 */

declare namespace jscad {
  /**
   * CAG (2D Constructive Area Geometry) class
   */
  export class CAG {
    /**
     * Create a CAG from an array of points
     */
    static fromPoints(points: number[][]): CAG;
    
    /**
     * Union this CAG with another
     */
    union(other: CAG): CAG;
    
    /**
     * Subtract another CAG from this one
     */
    subtract(other: CAG): CAG;
    
    /**
     * Extrude this 2D CAG into a 3D CSG
     */
    extrude(options: { offset: number[] }): CSG;
  }

  /**
   * CSG (3D Constructive Solid Geometry) class
   */
  export class CSG {
    /**
     * Union this CSG with another
     */
    union(other: CSG): CSG;
    
    /**
     * Translate this CSG by an offset
     */
    translate(offset: number[]): CSG;
  }

  /**
   * CSG namespace containing nested types and utilities
   */
  export namespace CSG {
    /**
     * Options for creating a circle
     */
    export interface ICircleOptions {
      center: number[];
      radius: number;
      resolution?: number;
    }

    /**
     * Options for creating an arc
     */
    export interface IArcOptions {
      center: number[];
      radius: number;
      startangle: number;
      endangle: number;
      resolution?: number;
    }

    /**
     * Options for creating an elliptical arc
     */
    export interface IEllpiticalArcOptions {
      radius: number;
      clockwise: boolean;
      large: boolean;
      resolution?: number;
    }

    /**
     * Path2D utilities for creating 2D paths
     */
    export namespace Path2D {
      /**
       * Create an arc path
       */
      export function arc(options: IArcOptions): any;
    }
  }

  /**
   * STL serializer interface
   */
  export interface StlSerializer {
    serialize(csg: CSG, options: { binary: boolean; statusCallback?: (status: { progress: number }) => void }): string;
  }
}

export = jscad;
export as namespace jscad;
