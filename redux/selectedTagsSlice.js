import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};

export const selectedTagsSlice = createSlice({
  name: "selectedTagsSlice",
  initialState,
  reducers: {
    setSelectedTagsTest: (state, action) => {
      state.tags = action.payload;
    },
    addTagToSelected: (state, action) => {
      state.tags = [...state.tags, action.payload];
    },
    removeTagFromSelected: (state, action) => {
      state.tags = state.tags.splice(state.tags.indexOf(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedTagsTest, addTagToSelected, removeTagFromSelected } =
  selectedTagsSlice.actions;

export default selectedTagsSlice.reducer;
