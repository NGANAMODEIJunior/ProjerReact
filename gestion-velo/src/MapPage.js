import React, { useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import './MapPage.css';


function Map() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const Camping = useMemo(() => [
    [50.079239, 1.822605],
    [50.079896, 1.822127],
    [50.079981, 1.822355],
    [50.080548, 1.821919],
    [50.080841, 1.821919],
    [50.081363, 1.821585],
    [50.081540, 1.822307],
    [50.079710, 1.823973]
  ], []);

  useEffect(() => {
    if (!map) {
      const initMap = L.map('map').setView([50.079239, 1.822605], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(initMap);

      L.polygon(Camping, { color: 'black' }).addTo(initMap);

      setMap(initMap);
    }
  }, [map, Camping]);

  useEffect(() => {
    const updateMarkers = async () => {
      try {
        const response = await fetch('http://192.168.65.107:3001/Proprietaire');
        const data = await response.json();

        markers.forEach(marker => {
          map.removeLayer(marker);
        });

        const newMarkers = [];

        for (const coord of data) {
          const velo = new Velo(coord.VeloID, coord.longitude, coord.latitude);

          let iconUrl = '/greenBike.png';
          let popupText = `Velo Numero : ${velo.getVeloID()}</br>Nom : ${coord.Nom}</br>Prenom : ${coord.Prenom}`;

          if (coord.IDUser === null || coord.Nom === null || coord.Prenom === null) {
            iconUrl = '/redBike.png';
            popupText = `Velo Numero : ${velo.getVeloID()}</br>Status : Non Loué`;
          }

          const marker = L.marker([velo.getLatitude(), velo.getLongitude()], { icon: L.icon({ iconUrl, iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -40] }) }).addTo(map)
            .bindPopup(popupText);

          newMarkers.push(marker);
        }

        setMarkers(newMarkers);
      } catch (error) {
        console.error('Erreur lors de la récupération des marqueurs :', error);
      }
    };

    if (map) {
      updateMarkers();
      const interval = setInterval(updateMarkers, 6000);
      return () => clearInterval(interval);
    }
  }, [map, markers, Camping]);

  // eslint-disable-next-line
function pointInsidePolygon(point, poly) {
  var x = point[0], y = point[1];
  var inside = false;
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    var xi = poly[i][0], yi = poly[i][1];
    var xj = poly[j][0], yj = poly[j][1];
    var intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

  return (
    <div>
      <h1>Leaflet Map with Database Markers</h1>
      <div id="map" className="map-container"></div>
    </div>
  );
}

class Velo {
  constructor(veloID, longitude, latitude) {
    this.veloID = veloID;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  getVeloID() {
    return this.veloID;
  }

  getLongitude() {
    return this.longitude;
  }

  getLatitude() {
    return this.latitude;
  }
}

export default Map;
