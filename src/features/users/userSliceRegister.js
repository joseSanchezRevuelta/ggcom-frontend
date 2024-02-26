import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerRepository } from './usersRepository'

const initialState = {
  userData: JSON.parse(localStorage.getItem("data_ggcom")) || {},
  loading: false
}

// Creamos el thunk
export const userAuthRegister = createAsyncThunk(
  'users/userAuth',
  async (requestOptions, thunkAPI) => {
    const response = await registerRepository(requestOptions)
    // return response.data
    return response
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: state => {
      // Devuelve un nuevo estado con userData vacío
      return {
        ...state,
        userData: {},
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userAuthRegister.pending, (state, action) => {
        state.loading =  true
      });

      builder.addCase(userAuthRegister.fulfilled, (state, action) => {
        state.loading =  false
        if (action.payload && action.payload.success === true) {
          state.userData = action.payload
        }
      });
  }
})

export const counterSlice = createSlice({
  name: 'user',
  initialState
})

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer