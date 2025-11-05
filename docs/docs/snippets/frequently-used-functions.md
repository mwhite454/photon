---
ai_summary: It's good to be aware of these functions which apply to many drawing scenarios.
  Also, browse the APIs of each module for lesser used specialized fu...
category: General
description: It's good to be aware of these functions which apply to many drawing
  scenarios. Also, browse the APIs of each module for lesser used specialized fu...
difficulty: intermediate
keywords:
- drawing
- frequently
- functions
- general
- used
primary_topic: frequently-used-functions
source: docs/_snippets/frequently-used-functions.html
tags:
- intermediate
- general
- frequently-used-functions
title: Frequently Used Functions
---
It's good to be aware of these functions which apply to many drawing scenarios. Also, browse the APIs of each module for lesser used specialized functions.

#### Functions for working with points in the [makerjs.point](../converted/api/modules/core_point.md) module:

* [point.add](../converted/api/functions/core_point.add.md)

  Add two points together and return the result as a new point.
* [point.subtract](../converted/api/functions/core_point.subtract.md)

  Subtract a point from another point and return the result as a new point.
* [point.average](../converted/api/functions/core_point.average.md)

  Get the average of two points and return the result as a new point.
* [point.fromPolar](../converted/api/functions/core_point.fromPolar.md)

  Get a point from its polar coordinates: angle (in radians) and radius.
* [point.closest](../converted/api/functions/core_point.closest.md)

  Given a reference point and an array of points, find the closest point in the array to the reference point.
* [point.scale](../converted/api/functions/core_point.scale.md)

  Proportionately scale a point and return the result as a new point.
* [point.distort](../converted/api/functions/core_point.distort.md)

  Disproportionately scale a point and return the result as a new point.
* [point.rotate](../converted/api/functions/core_point.rotate.md)

  Rotate a point and return the result as a new point.
* [point.fromPathEnds](../converted/api/functions/core_point.fromPathEnds.md)

  Return the two end points of a given path (null if path is a circle).

#### Functions for working with angles in the [makerjs.angle](../converted/api/modules/core_angle.md) module:

* [angle.toDegrees](../converted/api/functions/core_angle.toDegrees.md)

  Convert an angle from radians to degrees.
* [angle.toRadians](../converted/api/functions/core_angle.toRadians.md)

  Convert an angle from degrees to radians.
* [angle.ofLineInDegrees](../converted/api/functions/core_angle.ofLineInDegrees.md)

  Given a line, returns its angle in degrees.
* [angle.ofPointInDegrees](../converted/api/functions/core_angle.ofPointInDegrees.md)

  Given two points, returns the angle of the line through them, in degrees.
* [angle.ofPointInRadians](../converted/api/functions/core_angle.ofPointInRadians.md)

  Given two points, returns the angle of the line through them, in radians.
* [angle.noRevolutions](../converted/api/functions/core_angle.noRevolutions.md)

  Given a polar angle in degrees, returns the same angle cast between -360 and 360. For example, 725 degrees = 5 degrees.
* [angle.ofArcSpan](../converted/api/functions/core_angle.ofArcSpan.md)

  Given an arc, returns total angle span between its start and end angles.

#### Functions for working with measurements in the [makerjs.measure](../converted/api/modules/core_measure.md) module:

* [measure.pointDistance](../converted/api/functions/core_measure.pointDistance.md)

  Calculates the distance between two points using the Pythagorean theorem.
* [measure.pathLength](../converted/api/functions/core_measure.pathLength.md)

  Measures the length of a path.
* [measure.isPointEqual](../converted/api/modules/core_measure.md)

  Given two points, determine if they are equal within a distance of accuracy.
* [measure.isMeasurementOverlapping](../converted/api/functions/core_measure.isMeasurementOverlapping.md)

  Given two measurements, determine if they are overlapping. Also known as "bounding box overlap".
* [measure.isAngleEqual](../converted/api/modules/core_measure.md)

  Given two angles, determine if they are equal within a margin of accuracy.
