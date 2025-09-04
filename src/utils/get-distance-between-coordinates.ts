/**
 * Interface representing a geographic coordinate
 */
export interface Coordinate {
  /** Latitude coordinate (-90 to 90) */
  latitude: number;
  /** Longitude coordinate (-180 to 180) */
  longitude: number;
}

/**
 * Calculates the distance between two geographic coordinates using the Haversine formula
 * 
 * This function computes the great-circle distance between two points on Earth,
 * returning the result in kilometers.
 * 
 * @param from - Starting coordinate
 * @param to - Destination coordinate
 * @returns Distance in kilometers between the two coordinates
 * 
 * @example
 * ```typescript
 * const distance = getDistanceBetweenCoordinates(
 *   { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
 *   { latitude: -22.9068, longitude: -43.1729 }  // Rio de Janeiro
 * );
 * console.log(`Distance: ${distance.toFixed(2)} km`); // ~358.45 km
 * ```
 */
export function getDistanceBetweenCoordinates(
  from: Coordinate,
  to: Coordinate
): number {
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
