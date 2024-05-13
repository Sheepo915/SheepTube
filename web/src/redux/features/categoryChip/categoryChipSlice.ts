import { createSlice } from "@reduxjs/toolkit";

interface CategoryChipState {
  selectedIndex: number;
}

const initialState: CategoryChipState = {
  selectedIndex: 0,
};

export const categoryChipSlice = createSlice({
  name: "categoryChip",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { selectCategory } = categoryChipSlice.actions;
export default categoryChipSlice.reducer;
