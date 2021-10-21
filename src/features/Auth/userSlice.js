import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import Storagekeys from "constants/storage-key";

// First, create the thunk
export const register = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    //call Api to register
    const data = await userApi.register(payload);

    //save data to local storage
    localStorage.setItem(Storagekeys.TOKEN, data.jwt);
    localStorage.setItem(Storagekeys.USER, JSON.stringify(data.user));

    //return user data
    return data.user;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    //call Api to register
    const data = await userApi.login(payload);

    //save data to local storage
    localStorage.setItem(Storagekeys.TOKEN, data.jwt);
    localStorage.setItem(Storagekeys.USER, JSON.stringify(data.user));

    //return user data
    return data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    //set data to redux from localstorage when user reload pages
    current: JSON.parse(localStorage.getItem(Storagekeys.USER)) || {},
    settings: {},
  },
  reducers: {
    //sync action
    // standard reducer logic, with auto-generated action types per reducer
    logout(state, action) {
      //clear local storage
      localStorage.removeItem(Storagekeys.USER);
      localStorage.removeItem(Storagekeys.TOKEN);

      //reset state
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    //async action
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
