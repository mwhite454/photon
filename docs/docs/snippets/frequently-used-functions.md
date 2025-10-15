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

#### Functions for working with points in the [makerjs.point](../api/modules/core_point.html#content) module:

* [point.add](../api/modules/core_point.html#add)

  Add two points together and return the result as a new point.
* [point.subtract](../api/modules/core_point.html#subtract)

  Subtract a point from another point and return the result as a new point.
* [point.average](../api/modules/core_point.html#average)

  Get the average of two points and return the result as a new point.
* [point.fromPolar](../api/modules/core_point.html#frompolar)

  Get a point from its polar coordinates: angle (in radians) and radius.
* [point.closest](../api/modules/core_point.html#closest)

  Given a reference point and an array of points, find the closest point in the array to the reference point.
* [point.scale](../api/modules/core_point.html#scale)

  Proportionately scale a point and return the result as a new point.
* [point.distort](../api/modules/core_point.html#distort)

  Disproportionately scale a point and return the result as a new point.
* [point.rotate](../api/modules/core_point.html#rotate)

  Rotate a point and return the result as a new point.
* [point.fromPathEnds](../api/modules/core_point.html#frompathends)

  Return the two end points of a given path (null if path is a circle).

#### Functions for working with angles in the [makerjs.angle](../api/modules/core_angle.html#content) module:

* [angle.toDegrees](../api/modules/core_angle.html#todegrees)

  Convert an angle from radians to degrees.
* [angle.toRadians](../api/modules/core_angle.html#toradians)

  Convert an angle from degrees to radians.
* [angle.ofLineInDegrees](../api/modules/core_angle.html#oflineindegrees)

  Given a line, returns its angle in degrees.
* [angle.ofPointInDegrees](../api/modules/core_angle.html#ofpointindegrees)

  Given two points, returns the angle of the line through them, in degrees.
* [angle.ofPointInRadians](../api/modules/core_angle.html#ofpointinradians)

  Given two points, returns the angle of the line through them, in radians.
* [angle.noRevolutions](../api/modules/core_angle.html#norevolutions)

  Given a polar angle in degrees, returns the same angle cast between -360 and 360. For example, 725 degrees = 5 degrees.
* [angle.ofArcSpan](../api/modules/core_angle.html#ofarcspan)

  Given an arc, returns total angle span between its start and end angles.

#### Functions for working with measurements in the [makerjs.measure](../api/modules/core_measure.html#content) module:

* [measure.pointDistance](../api/modules/core_measure.html#pointdistance)

  Calculates the distance between two points using the Pythagorean theorem.
* [measure.pathLength](../api/modules/core_measure.html#pathlength)

  Measures the length of a path.
* [measure.isPointEqual](../api/modules/core_measure.html#ispointequal)

  Given two points, determine if they are equal within a distance of accuracy.
* [measure.isMeasurementOverlapping](../api/modules/core_measure.html#ismeasurementoverlapping)

  Given two measurements, determine if they are overlapping. Also known as "bounding box overlap".
* [measure.isAngleEqual](../api/modules/core_measure.html#isangleequal)

  Given two angles, determine if they are equal within a margin of accuracy.
