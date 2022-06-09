/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Navigation from '../components/Navigation';
import {deepEqual} from "fast-equals";

const cookiesName = 'villes';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const MapRender: React.FC = () => {
  const zoom = 3; // initial zoom
  const center = { lat: 0, lng: 0 }

  if(localStorage.getItem(cookiesName) === null) {
    const datavilles = `{"1":{"id":1,"flag":"https://flagcdn.com/ng.svg","pays":"Nigéria","capital":"Abuja","population":"206 139 587","lat":10,"lng":8},"31":{"id":31,"flag":"https://flagcdn.com/de.svg","pays":"Allemagne","capital":"Berlin","population":"83 240 525","lat":51,"lng":9},"43":{"id":43,"flag":"https://flagcdn.com/ar.svg","pays":"Argentine","capital":"Buenos Aires","population":"45 376 763","lat":-34,"lng":-64},"162":{"id":162,"flag":"https://flagcdn.com/fr.svg","pays":"France","capital":"Paris","population":"67 391 582","lat":46,"lng":2},"236":{"id":236,"flag":"https://flagcdn.com/us.svg","pays":"États-Unis","capital":"Washington, D.C.","population":"329 484 123","lat":38,"lng":-97}}`;
    localStorage.setItem(cookiesName, datavilles);
  }

  return (
    <div style={{ height: "100%" }}>
      <Navigation/>
      <Wrapper apiKey={"AIzaSyA6EVPKlPBRAnhyVZ7k1Hz64Fhx4r5S4CY"} render={render}>
        <Map center={center} zoom={zoom} style={{ flexGrow: "1", height: "90vh" }}>
          {Object.entries(JSON.parse(localStorage.getItem(cookiesName)!)).map(([key, value]: any[]) => (
            <Marker key={key} position={{ lat: value["lat"], lng: value["lng"] }} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
  if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
    }
  }, [map]);

  return (
    <>
      <div id="map_canvas" ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const Key = options;

  console.log(Key)

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

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapRender;