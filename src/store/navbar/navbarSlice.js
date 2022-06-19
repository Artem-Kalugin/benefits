import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: 'Splash',
  prevRoute: null,
  isVisible: false,
  activeIndex: 0,
  headerHeight: 200,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    changeRoute: (state, action) => {
      state.prevRoute = state.route;
      state.route = action.payload;
    },
    changeIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
    changeHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    },
  },
});

export const { changeIsVisible, changeHeaderHeight, changeRoute } =
  navbarSlice.actions;

export default navbarSlice.reducer;
