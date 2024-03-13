import { StatusOrder } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  status: StatusOrder[] | [];
};

const initialState: InitialState = {
  status: [],
};
const statusSlice = createSlice({
  name: 'status',
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
        ?.map((s: StatusOrder) => s)
        .sort((a: StatusOrder, b: StatusOrder) => a.number - b.number);
    },
  },
});
export const status = (state: { status: InitialState }) => state.status.status;

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
