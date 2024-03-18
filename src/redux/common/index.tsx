import {createSlice} from '@reduxjs/toolkit';
import {
  Flight,
  getFlights,
} from '../../services/flights';
import {showMessage} from 'react-native-flash-message';

// Files
import {goBack, navigate} from '../../utils/routerServices';
import routes from '../../constants/routes';

const initialState = {
  loading: false,
  results: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    resetCommonSlice: () => initialState,
  },
});

type flightParams = {
  origin: string;
  destination: string;
}

export const getFlightThunk = (param : flightParams) => {
  return async (dispatch: any) => {
    const res: any = await getFlights();
    if (res) {
      if (res?.length) {
        let finalResult = res.filter((flight : Flight) => {
          if(flight.origin.toLocaleLowerCase() === param.origin.toLocaleLowerCase() && flight.destination.toLocaleLowerCase() === param.destination.toLocaleLowerCase()) {
            return true
          }
          return false
        })
        dispatch(setResults(finalResult));
        navigate(routes.FLIGHT_LIST, {});
      }
    }
  };
};

export const {setLoading, setResults, resetCommonSlice} = commonSlice.actions;

export default commonSlice.reducer;
