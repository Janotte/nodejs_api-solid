export interface Coordinate {
  latitude: number;
  longitude: number;
}

export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
) {
  const fromRadians = (from.latitude * Math.PI) / 180;
  const toRadians = (to.latitude * Math.PI) / 180;

  const theta = from.longitude - to.longitude;
  const thetaRadians = (theta * Math.PI) / 180;

  let dist =
    Math.sin(fromRadians) * Math.sin(toRadians) +
    Math.cos(fromRadians) * Math.cos(toRadians) * Math.cos(thetaRadians);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = (dist * 60 * 1.1515) * 1.609344;

  return dist;
}
