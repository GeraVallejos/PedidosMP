
# Archivo `authSlice.js`

Este archivo define un *slice* de autenticación utilizando `@reduxjs/toolkit` en una aplicación React. Maneja el estado del usuario, tokens JWT y las operaciones de login, logout y obtención de datos del usuario autenticado.

---

## Dependencias

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../helpers/interceptorJWT';
```

- **`createSlice`**: Utilidad de Redux Toolkit para generar reducers y acciones.
- **`createAsyncThunk`**: Middleware para gestionar efectos secundarios asincrónicos.
- **`api`**: Axios preconfigurado con interceptor JWT.

---

## Endpoints utilizados

```js
const API_URL = 'http://localhost:8000/api/token/';
const USER_INFO_URL = 'http://localhost:8000/api/v1/usuario/actual/';
```

- `API_URL`: Endpoint para obtener los tokens de acceso y refresh.
- `USER_INFO_URL`: Endpoint para obtener información del usuario autenticado.

---

## Thunks de autenticación

### `login`

```js
export const login = createAsyncThunk(...)
```
createAsyncThunk es una función esencial de Redux Toolkit que simplifica el manejo de operaciones asíncronas en Redux.

Es una función que crea un "thunk" (función asíncrona) para Redux, automatizando:

- El despacho de acciones durante el ciclo de vida de una petición asíncrona
- El manejo de estados de carga (pending, fulfilled, rejected)
- La actualización del store basado en el resultado

#### Partes Clave

1. Tipo de acción: String único (ej. 'auth/login')

2. Función payload: Función asíncrona que:

    - Recibe argumentos (primer parámetro)
    - Recibe thunkAPI (segundo parámetro) con utilidades como dispatch, getState, etc.
    - Devuelve una Promise

#### Estados que Genera Automáticamente

Cada llamada genera tres acciones automáticamente:

1. pending: 'nombreAccion/tipo/pending' (cuando comienza)

2. fulfilled: 'nombreAccion/tipo/fulfilled' (cuando tiene éxito)

3. rejected: 'nombreAccion/tipo/rejected' (cuando falla)

- Envia `username` y `password` al backend.
- Al autenticarse, guarda `accessToken` y `refreshToken` en `localStorage`.
- En caso de error, devuelve un mensaje de rechazo.

---

### `logout`

```js
export const logout = createAsyncThunk(...)
```

- Elimina tokens (`accessToken`, `refreshToken`) y datos de usuario (`user`) del `localStorage`.

---

### `fetchUser`

```js
export const fetchUser = createAsyncThunk(...)
```

- Usa el `accessToken` desde `localStorage`.
- Solicita datos del usuario al backend.
- Guarda la respuesta en el estado y en `localStorage`.

---

## Slice de Redux: `authSlice`

```js
export const authSlice = createSlice({...});
```

### Estado inicial

```js
initialState: {
    token: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
}
```

### Reducers

- No se definen reducers directos, todo se maneja con `extraReducers`.

### Extra Reducers

Maneja los distintos estados de las thunks:

- **`login.pending`**: activa loading.
- **`login.fulfilled`**: guarda el token y marca como autenticado.
- **`login.rejected`**: guarda el error.
- **`logout.fulfilled`**: limpia la sesión.
- **`fetchUser.fulfilled`**: guarda los datos del usuario.
- **`fetchUser.rejected`**: guarda el error.

---

## Exportaciones

```js
export default authSlice.reducer;
```

- Se exporta el *reducer* para su uso en el store principal.
