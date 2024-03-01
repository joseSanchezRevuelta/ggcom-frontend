import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginRepository } from './usersRepository'

const initialState = {
  userData: JSON.parse(localStorage.getItem("data_ggcom")) || {},
  loading: false
}

// Creamos el thunk
export const userdAuth = createAsyncThunk(
  'users/userAuth',
  async (requestOptions, thunkAPI) => {
    const response = await loginRepository(requestOptions)
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
    },
    updateUsernameState: (state, action) => {
      // Obtener el objeto data_ggcom del localStorage
      const data_ggcom = JSON.parse(localStorage.getItem("data_ggcom"));
      // Actualizar el campo username del objeto data_ggcom con el nuevo nombre de usuario
      data_ggcom.username = action.payload;
      // Guardar el objeto actualizado en el localStorage
      localStorage.setItem("data_ggcom", JSON.stringify(data_ggcom));
      // Devolver un nuevo estado actualizado con el objeto data_ggcom actualizado
      return {
        ...state,
        userData: data_ggcom
      };
    },
    updateEmailState: (state, action) => {
      // Obtener el objeto data_ggcom del localStorage
      const data_ggcom = JSON.parse(localStorage.getItem("data_ggcom"));
      // Actualizar el campo username del objeto data_ggcom con el nuevo nombre de usuario
      data_ggcom.email = action.payload;
      // Guardar el objeto actualizado en el localStorage
      localStorage.setItem("data_ggcom", JSON.stringify(data_ggcom));
      // Devolver un nuevo estado actualizado con el objeto data_ggcom actualizado
      return {
        ...state,
        userData: data_ggcom
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userdAuth.pending, (state, action) => {
      state.loading = true
    });

    builder.addCase(userdAuth.fulfilled, (state, action) => {
      state.loading = false
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

export const { clearUserData, updateUsernameState, updateEmailState } = userSlice.actions;

export default userSlice.reducer