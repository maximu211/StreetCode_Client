import Rhombus from '@images/utils/Instagram.png';

import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

export const icon = new Icon({
    iconUrl: Rhombus,
    iconSize: [25, 25],
});

const MapOSM = () => {
    const [lat, setLat] = useState(50.4501);
    const [long, setLong] = useState(30.5234);
    const [zoom, setZoom] = useState(6);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://nominatim.openstreetmap.org/search?q=ukraine&format=json');
            const data = await response.json();
            setLat(data[0].lat);
            setLong(data[0].lon);
        };

        fetchData();
    }, []);

    return (
        <MapContainer center={[lat, long]} zoom={zoom} style={{ height: 'calc(100% - 7.75rem)' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[50.4501, 30.5234]} icon={icon} />
        </MapContainer>
    );
};

export default MapOSM;
