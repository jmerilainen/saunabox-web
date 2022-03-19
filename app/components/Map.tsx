import { useState } from 'react';
import {Map, Marker, MarkerProps} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1lcmlsYWluZW4iLCJhIjoiY2t6bnAzOXZ6MDhzOTJ3cWdmY3lndHY2NiJ9.cs2DSl79Ukq2LC_lPMKahg';

function Cube() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-package"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    )
  }


interface MyMapProps {
  id: string;
  latitude: number;
  longitude: number;
  zoom: number;
  markers: MarkerProps[]
}

const MyMap = ({
  id = 'map',
  latitude = 60.153623149473916,
  longitude = 24.77174979823459,
  zoom = 12,
  markers = [],
}: Partial<MyMapProps>) => {

    return (
      <div className="text-black">
        <Map
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: zoom
            }}
            id={id}
            style={{width:'100%', height: '400px'}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            {markers.map((item, index) => (
              <Marker {...item} key={index}>
                <div className="animate-bounce">
                    <Cube />
                </div>
              </Marker>
            ))}
        </Map>
      </div>
    )
}

export default MyMap;