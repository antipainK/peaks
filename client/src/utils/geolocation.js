export const geolocationAvailable = 'geolocation' in navigator;

/**
 * Returns a Promise resolving to the current device location.
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    const options = {};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      reject,
      options
    );
  });
}

/**
 * Returns the distance in kilometres between two geographical points.
 *
 * See https://www.movable-type.co.uk/scripts/latlong.html#equirectangular
 */
export function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const x = toRadians(lon2 - lon1) * Math.cos(toRadians(lat1 + lat2) / 2);
  const y = toRadians(lat2 - lat1);
  return Math.sqrt(x * x + y * y) * R;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
