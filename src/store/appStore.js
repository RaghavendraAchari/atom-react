import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './album/albumSlice';

export default configureStore({
  reducer: {
    albums: albumReducer
  }
})