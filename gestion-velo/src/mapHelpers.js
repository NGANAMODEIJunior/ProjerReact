//mapHelpers.js

import L from 'leaflet';

// Vos icônes définies ici
export const icons = {
  green: L.icon({
    iconUrl: '../src/greenBike.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }),
  red: L.icon({
    iconUrl: '../src/redBike.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }),
  purple: L.icon({
    iconUrl: '../src/purpleBike.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }),
  warning: L.icon({
    iconUrl: '../src/Warning-mark.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }),
  orange: L.icon({
    iconUrl: '../src/orangeBike.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
};

export const campingPolygon = [
  [50.079239, 1.822605],
  [50.079896, 1.822127],
  [50.079981, 1.822355],
  [50.080548, 1.821919],
  [50.080841, 1.821919],
  [50.081363, 1.821585],
  [50.081540, 1.822307],
  [50.079710, 1.823973]
];

export function pointInsidePolygon(point, poly) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export async function fetchBikeData() {
    try {
      const response = await fetch('http://192.168.65.107:3001/Proprietaire');
      const data = await response.json();
      // Vérifiez que les données contiennent des coordonnées valides
      return data.filter(coord => coord.latitude && coord.longitude);
    } catch (error) {
      console.error('Error fetching bike data:', error);
      return [];
    }
  }
  
  export async function fetchBikeHistory(veloID) {
    try {
      const response = await fetch(`http://192.168.65.107:3001/getBikeHistory/${veloID}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching bike history:', error);
      return [];
    }
  }
  

export function areLastThreePositionsSame(history) {
  if (history.length < 3) return false;
  const [last, secondLast, thirdLast] = history.slice(-3);
  return last.latitude === secondLast.latitude && last.longitude === secondLast.longitude &&
    secondLast.latitude === thirdLast.latitude && secondLast.longitude === thirdLast.longitude;
}

export function areLastTwoPositionsNotSame(history) {
  if (history.length < 2) return false;
  const [last, secondLast] = history.slice(-2);
  return last.latitude !== secondLast.latitude || last.longitude !== secondLast.longitude;
}
