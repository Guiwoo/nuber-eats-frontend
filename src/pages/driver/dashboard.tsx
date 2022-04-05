import GoogleMapReact from "google-map-react";
import {useEffect, useState} from "react";

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({lat: 0, lng: 0});
  const [map, setMap] = useState<any>();
  const [maps, setMpas] = useState<any>();
  const onSucess = ({coords: {latitude, longitude}}: GeolocationPosition) => {
    setDriverCoords({lat: latitude, lng: longitude});
  };
  const onError = (error: any) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSucess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({map, maps}: {map: any; maps: any}) => {
    setMap(map);
    setMpas(maps);
    setTimeout(() => {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }, 2000);
  };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{width: window.innerWidth, height: "50vh"}}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={13}
          defaultCenter={{
            lat: 38.74,
            lng: 127.0507,
          }}
          bootstrapURLKeys={{key: "AIzaSyBIXzb1BErW9ILN08wRIP2HeiUtkWhj6l8"}}
        >
          <div
            // @ts-ignore
            lat={driverCoords.lat}
            lng={driverCoords.lng}
            className="text-lg"
          >
            🚖
          </div>
        </GoogleMapReact>
      </div>
    </div>
  );
};
