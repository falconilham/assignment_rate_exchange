import { createSlice, combineReducers, configureStore, createStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

interface Props {
  fromCurrency?: string;
  toCurrency: string;
  rate?: {
    all: number;
    data: Date;
  }
}

const getData =  createAsyncThunk('getData', async (_, {dispatch}) => {
  dispatch(toggleLoading())
  const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
  const data = await response.data;
  const result = Object.entries(data).map((item) => ({
    label: item[1],
    value: item[0]
  }))
  dispatch(toggleLoading())
  return result;
});

// there are limit for call more api at once && just additional call for all rate base on toCurrency

// const getAllRateExchange = ({ toCurrency }: Props) => async (dispatch: (func: any) => void) => {
//   dispatch(toggleLoading())
//   const getState = store.getState()
//   const cachedState = getState.value
//   const getDataAll = getState.data
//   const toCurrencies = cachedState.toCurrency
//   if (toCurrencies !== toCurrency) {
//     // await Promise.all()
//     console.log('run')
//     const getAllRate = await Promise.all(
//       getDataAll.map(async ({value}) => {
//         const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${value}/${toCurrency}.json`)
//         const result = await response.json()
        
//       })
//     )
//     console.log({getAllRate}, getAllRate)
    // const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${toCurrency}.json`);
    // const result = await response.data;
    
//   }
//   dispatch(toggleLoading())
// }

const getRateExchange = ({ fromCurrency, toCurrency }: Props, navigate: (param: string) => void) => async (dispatch: (func: any) => void) => {
  dispatch(toggleLoading())
  const getState = store.getState()
  const cachedState = getState.value
  const fromCurrencies = cachedState.fromCurrency
  const toCurrencies = cachedState.toCurrency
  if (fromCurrencies !== fromCurrency && toCurrencies !== toCurrency) {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`);
    const result = await response.data;
    dispatch(rateCurrencyValue(result))
  }
  dispatch(fromCurrencyValue(fromCurrency))
  dispatch(toCurrencyValue(toCurrency))
  dispatch(toggleLoading())
  navigate('/result')
}

const initialState = {
  data: [],
  value: {
    fromCurrency: '',
    toCurrency: '',
    rate: {
      date: 0,
      all: 0
    }
  },
  loading: false,
  dataRate: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState.data,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getData.fulfilled, (state, { payload }: any) => state = payload)
  }
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState.loading,
  reducers: {
    toggleLoading: (state) => state = !state,
  },
});

const valueSlice = createSlice({
  name: 'value',
  initialState: initialState.value,
  reducers: {
    fromCurrencyValue(state, action) {
      state.fromCurrency = action.payload
    },
    toCurrencyValue(state, action) {
      state.toCurrency = action.payload
    },
    rateCurrencyValue(state, action) {
      state.rate = action.payload
    }
  },
});

// const allRateSlice = createSlice({
//   name: 'allRate',
//   initialState: initialState.dataRate,
//   reducers: {
//     addAllRate(state, action) {
//       state.dataRate = action.payload
//     }
//   },
// });

const combinedReducer = combineReducers({
  data: dataSlice.reducer,
  value: valueSlice.reducer,
  loading: loadingSlice.reducer,
  // addRate: allRateSlice.reducer
});


const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([]),
  devTools: process.env.NODE_ENV === 'development',
});

const { fromCurrencyValue, toCurrencyValue, rateCurrencyValue } = valueSlice.actions
// const {addAllRate} = allRateSlice.actions
const { toggleLoading } = loadingSlice.actions

export { fromCurrencyValue, toCurrencyValue, getData, toggleLoading, getRateExchange, rateCurrencyValue}

export type RootState = ReturnType<typeof combinedReducer>

export default store;
