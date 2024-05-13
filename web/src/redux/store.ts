import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./features/sidebar/sidebarSlice";
import categoryChipSlice from "./features/categoryChip/categoryChipSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    categoryChip: categoryChipSlice,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
