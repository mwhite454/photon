---
title: Frequently Used Functions
source: docs/_snippets/frequently-used-functions.html
---

---
title: Frequently used functions
---

It's good to be aware of these functions which apply to many drawing scenarios. Also, browse the APIs of each module for lesser used specialized functions.

#### Functions for working with points in the [makerjs.point](/docs/api/modules/makerjs.point.html#content) module:

* [point.add](/docs/api/modules/makerjs.point.html#add)

  Add two points together and return the result as a new point.
* [point.subtract](/docs/api/modules/makerjs.point.html#subtract)

  Subtract a point from another point and return the result as a new point.
* [point.average](/docs/api/modules/makerjs.point.html#average)

  Get the average of two points and return the result as a new point.
* [point.fromPolar](/docs/api/modules/makerjs.point.html#frompolar)

  Get a point from its polar coordinates: angle (in radians) and radius.
* [point.closest](/docs/api/modules/makerjs.point.html#closest)

  Given a reference point and an array of points, find the closest point in the array to the reference point.
* [point.scale](/docs/api/modules/makerjs.point.html#scale)

  Proportionately scale a point and return the result as a new point.
* [point.distort](/docs/api/modules/makerjs.point.html#distort)

  Disproportionately scale a point and return the result as a new point.
* [point.rotate](/docs/api/modules/makerjs.point.html#rotate)

  Rotate a point and return the result as a new point.
* [point.fromPathEnds](/docs/api/modules/makerjs.point.html#frompathends)

  Return the two end points of a given path (null if path is a circle).

#### Functions for working with angles in the [makerjs.angle](/docs/api/modules/makerjs.angle.html#content) module:

* [angle.toDegrees](/docs/api/modules/makerjs.angle.html#todegrees)

  Convert an angle from radians to degrees.
* [angle.toRadians](/docs/api/modules/makerjs.angle.html#toradians)

  Convert an angle from degrees to radians.
* [angle.ofLineInDegrees](/docs/api/modules/makerjs.angle.html#oflineindegrees)

  Given a line, returns its angle in degrees.
* [angle.ofPointInDegrees](/docs/api/modules/makerjs.angle.html#ofpointindegrees)

  Given two points, returns the angle of the line through them, in degrees.
* [angle.ofPointInRadians](/docs/api/modules/makerjs.angle.html#ofpointinradians)

  Given two points, returns the angle of the line through them, in radians.
* [angle.noRevolutions](/docs/api/modules/makerjs.angle.html#norevolutions)

  Given a polar angle in degrees, returns the same angle cast between -360 and 360. For example, 725 degrees = 5 degrees.
* [angle.ofArcSpan](/docs/api/modules/makerjs.angle.html#ofarcspan)

  Given an arc, returns total angle span between its start and end angles.

#### Functions for working with measurements in the [makerjs.measure](/docs/api/modules/makerjs.measure.html#content) module:

* [measure.pointDistance](/docs/api/modules/makerjs.measure.html#pointdistance)

  Calculates the distance between two points using the Pythagorean theorem.
* [measure.pathLength](/docs/api/modules/makerjs.measure.html#pathlength)

  Measures the length of a path.
* [measure.isPointEqual](/docs/api/modules/makerjs.measure.html#ispointequal)

  Given two points, determine if they are equal within a distance of accuracy.
* [measure.isMeasurementOverlapping](/docs/api/modules/makerjs.measure.html#ismeasurementoverlapping)

  Given two measurements, determine if they are overlapping. Also known as "bounding box overlap".
* [measure.isAngleEqual](/docs/api/modules/makerjs.measure.html#isangleequal)

  Given two angles, determine if they are equal within a margin of accuracy.
