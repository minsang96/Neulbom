import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultants: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConsultants: (state, action) => {
      state.consultants = action.payload
    }
  }
});

export const {
  setConsultants
} = chatSlice.actions;

export default chatSlice;