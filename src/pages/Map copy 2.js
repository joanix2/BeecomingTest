import React, { useEffect, useState, useRef} from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const google = window.google;

const Map = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    const Render = (status) => {
        const ref = useRef(null);
        const [map, setMap] = useState();
    
        useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
        }, [ref, map]);
    
        return (
            <div ref={ref} />
        );
    };

    return (
        <Wrapper apiKey={googleMapsApiKey} render={Render}>
        </Wrapper>
    )
  }

export default withGoogleMap(Map);