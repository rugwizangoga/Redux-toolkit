import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state)=>{
      state.isOpen = false;
    },
    openModal: (state)=>{
      state.isOpen = true;
    }
  }
})

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;