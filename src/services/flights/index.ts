import api from '../../api';
import apiTypes from '../../api/apiTypes';
import endPoints from '../../api/endPoints';

export type Flight = {
  id: number;
  gate: string;
  price: number;
  origin: string;
  airline: string;
  aircraft: string;
  duration: string;
  arrivalTime: string;
  destination: string;
  flightNumber: string;
  departureTime: string;
  seatsAvailable: number;
};

export const getFlights = async () => {
  const res = await api({
    enableLoader: true,
    type: apiTypes.get,
    url: endPoints.GET_FLIGHTS,
  });
  return res;
};
