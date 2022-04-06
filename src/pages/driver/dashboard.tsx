import {gql, useSubscription, useMutation} from "@apollo/client";
import GoogleMapReact from "google-map-react";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FULL_ORDER_FRAGMENT} from "../../fragment";
import {cookedOrders} from "../../__generated__/cookedOrders";
import {takeOrder, takeOrderVariables} from "../../__generated__/takeOrder";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

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
  const makePath = () => {
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
              driverCoords.lat + 0.05,
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
  const {data: cookedOrdersData} = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makePath();
    }
  }, [cookedOrdersData]);
  const navigation = useNavigate();
  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      navigation(`/orders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {onCompleted}
  );
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
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
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 text-center">
        {cookedOrdersData?.cookedOrders.id ? (
          <>
            <h1 className="text-3xl font-medium">New Cooked Order</h1>
            <h4>
              Pick it up soon! @
              {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h4>
            <button
              onClick={() => triggerMutation(cookedOrdersData?.cookedOrders.id)}
              className="btn w-full mt-5"
            >
              Get Order
            </button>
          </>
        ) : (
          <h1 className="text-3xl font-medium">No Orders</h1>
        )}
      </div>
    </div>
  );
};
