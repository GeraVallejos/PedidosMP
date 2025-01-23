import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint del backend
const API_URL = 'http://localhost:8000/api/token/';
const USER_INFO_URL = 'http://localhost:8000/api/v1/usuario/actual/'

// Thunk para manejar el inicio de sesión
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, { username, password });
            const { access, refresh } = response.data;

            // Guardar tokens en localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            return { access, refresh };
        } catch (error) {
            return rejectWithValue('Error de autenticación');
        }
    }
);

// Thunk para manejar el cierre de sesión
export const logout = createAsyncThunk('auth/logout', async () => {
    // Elimina los tokens del localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return true;
});

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(USER_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue('No se pudieron obtener los datos del usuario');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('accessToken') || null,
        isAuthenticated: !!localStorage.getItem('accessToken'),
        loading: false,
        error: null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;