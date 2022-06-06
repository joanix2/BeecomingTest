import React, {useMemo} from 'react';
import { Wrapper} from "@googlemaps/react-wrapper";
import Navigation from '../components/Navigation';

const google = window.google;

const MapRender = () => {

  const Map = () => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    
    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);

    return <div ref={ref} />
  };

  const Marker = (options) => {
    const [marker, setMarker] = React.useState();
  
    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
  };  

  const center = useMemo(() => ({ lat: 44, lng: -80 }, 15), []);

  return(
    <div>
      <Navigation/>
      <Wrapper mapContainerClassName="map-container" apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map center={center} zoom={10}>
          <Marker position={center} />
        </Map>
      </Wrapper>
    </div>
  )
};

//export default MapRender;