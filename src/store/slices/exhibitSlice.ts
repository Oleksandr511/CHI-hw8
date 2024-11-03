import { createSlice } from "@reduxjs/toolkit";

export const exhibitSlice = createSlice({
  name: "exhibit",
  initialState: {
    exhibits: [],
  },
  reducers: {
    addExhibit: (state, action) => {
      state.exhibits.push(action.payload);
    },
  },
});

export const { addExhibit } = exhibitSlice.actions;
export default exhibitSlice.reducer;
