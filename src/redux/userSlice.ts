import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product, UserData } from "../definitions"
import { RootState } from "./store";

export interface UserState {
  user: UserData | null,
  isAuthenticated: boolean

}


const initialState: UserState = {
  user: null,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) =>  {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logoutUser: () => initialState
  },
},
);

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions
