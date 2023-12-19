import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [gpsData, setGpsData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/get-gps-data')
            .then(response => {
                setGpsData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la requête :', error);
            });
    }, []);

    return (
        <div>
            <h1>Coordonnées GPS</h1>
            <p>Latitude : {gpsData.latitude}</p>
            <p>Longitude : {gpsData.longitude}</p>
        </div>
    );
}

export default App;
