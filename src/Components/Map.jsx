import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import MapStyles from "./MapStyles";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

var URL = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";

const markers = [
  {
    id: 1,
    name: "F11 Markaz, Islamabad",
    position: { lat: 33.6843, lng: 72.9885 },
  },
  {
    id: 2,
    name: "F10 Markaz, Islamabad",
    position: { lat: 33.690759, lng: 73.002983 },
  },
  {
    id: 3,
    name: "F7 Markaz, Islamabad",
    position: { lat: 33.7211, lng: 73.0571 },
  },
  {
    id: 4,
    name: "I10 Markaz, Islamabad",
    position: { lat: 33.6488, lng: 73.0407 },
  },
  {
    id: 5,
    name: "Saddar, Rawalpindo",
    position: { lat: 33.598827, lng: 73.05381 },
  },
];

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_GEOLOCATION_KEY,
  });
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
    setActiveMarker(null);
  }, []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    setActiveMarker(null);
    setShowingInfoWindow(true);
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const onMapClick = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onCloseClick = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    // eslint-disable-next-line
    markers.map((marker) => {
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <>
      <div className="App-header">
        REACT GOOGLE MAP USING @react-google-maps/api
      </div>
      <div className="map-div">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={16}
          options={{ styles: MapStyles.lunar }}
          onLoad={handleOnLoad}
          onUnmount={onUnmount}
          onClick={() => onMapClick()}
        >
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              icon={{
                url: URL,
              }}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker && activeMarker === id ? (
                <InfoWindow
                  visible={showingInfoWindow}
                  onCloseClick={() => onCloseClick()}
                >
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}

          <></>
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Map;
