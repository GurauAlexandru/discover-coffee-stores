import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
  SET_LAT_LONG: 'SET_LAT_LONG',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COFFEE_STORES:
      return {
        ...state,
        coffeeStores: action.payload.coffeeStores,
      };
    case ACTION_TYPES.SET_LAT_LONG:
      return {
        ...state,
        latLong: action.payload.latLong,
      };
    default:
      throw new Error(`Unhandle action type: ${action.type}`);
  }
};
const StoreProvider = ({ children }) => {
  const initialState = {
    coffeeStores: [],
    latLong: '',
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
