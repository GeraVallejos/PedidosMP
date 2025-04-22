import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../helpers/interceptorJWT';

// Endpoint del backend
const API_URL = 'http://localhost:8000/api/token/';
const USER_INFO_URL = 'http://localhost:8000/api/v1/usuario/actual/'

// Thunk para manejar el inicio de sesión
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // Hace petición POST al endpoint de login
            const response = await api.post(API_URL, { username, password });
            // Extrae tokens de la respuesta
            const { access, refresh } = response.data;

            // Guardar tokens en localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            //Retorna los tokens para el reducer
            return { access, refresh };
        } catch (error) {
            // Proviene de ThunkApi
            return rejectWithValue('Error de autenticación');
        }
    }
);

// Thunk para manejar el cierre de sesión
export const logout = createAsyncThunk('auth/logout', async () => {
    // Elimina los tokens del localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return true;
});

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            // Obtiene token del localStorage
            const token = localStorage.getItem('accessToken');
            // Hace petición GET para info del usuario
            const response = await api.get(USER_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envía token en headers
                },
            });
            // Retorna datos del usuario
            return response.data; 
        } catch (error) {
            return rejectWithValue('No se pudieron obtener los datos del usuario');
        }
    }
);

export const authSlice = createSlice({
    // name debe ser el que se ocupa en en los Thunk (createAsyncThunk)
    name: 'auth',
    // El estado inicial es el que esta en el local storage y puede ser null
    initialState: {
        token: localStorage.getItem('accessToken') || null,
        // Con la doble negacion se transforma el valor en booleano
        isAuthenticated: !!localStorage.getItem('accessToken'),
        loading: false,
        error: null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            // Login pendiente
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Login exitoso
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access;
                state.isAuthenticated = true;
            })
            // Login fallido
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout exitoso
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.isAuthenticated = false;
            })
            // FetchUser pendiente
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // FetchUser exitoso
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            // FetchUser fallido
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;