import React from 'react';
import { useMemo } from 'react';
import Navigation from '../components/Navigation';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if(!isLoaded) return <div>Loading...</div>;

    return <MapView/>;
};


const MapView = () => {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    const options = useMemo(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );

    return (
        <div>
            <Navigation/>
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" options={options}>
                <Marker position={center}/>
            </GoogleMap>
        </div>
    );
};

export default Map;