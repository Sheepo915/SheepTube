import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
