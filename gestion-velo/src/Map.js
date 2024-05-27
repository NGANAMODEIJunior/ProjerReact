import React, { useEffect, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: 10
        });

        new window.google.maps.Marker({
          position: center,
          map: map
        });
      }
    };

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  return <div ref={mapRef} style={containerStyle} />;
}

export default Map;
