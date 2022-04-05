import GoogleMapReact from "google-map-react";
import React, {useEffect, useState} from "react";

interface ICoords {
  lat: number;
  lng: number;
}
interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({lat: 0, lng: 0});
  const [map, setMap] = useState<google.maps.Map>();
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
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      //   const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode(
      //     {location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng)},
      //     (results, status) => {
      //       console.log(status, results);
      //     }
      //   );
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({map, maps}: {map: any; maps: any}) => {
    setMap(map);
    setMpas(maps);
    setTimeout(() => {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    }, 2000);
  };
  const onGetRouteClick = () => {
    const directionService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer();
    if (map) {
      directionRenderer.setMap(map);
      directionService.route(
        {
          travelMode: google.maps.TravelMode.DRIVING,
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.5,
              driverCoords.lng + 0.03
            ),
          },
        },
        (result, status) => {
          directionRenderer.setDirections(result);
        }
      );
    }
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
          {/* <Driver lat={driverCoords.lat} lng={driverCoords.lng} /> */}
        </GoogleMapReact>
      </div>
      <button className="btn" onClick={onGetRouteClick}>
        Get Route
      </button>
    </div>
  );
};
