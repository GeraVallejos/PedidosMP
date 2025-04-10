# Archivo api.jsx

Este módulo configura una instancia personalizada de Axios para interactuar con la API del backend. Se utiliza como cliente HTTP en una aplicación React.

---

## Dependencias

```js
import axios from 'axios';
```

Se importa la librería `axios`. Axios es un cliente HTTP basado en Promesas (y async/await), que permite interactuar con APIs RESTful de manera sencilla y eficiente. A diferencia de la API nativa fetch(), Axios ofrece características adicionales que facilitan el manejo de solicitudes y respuestas.

Se utiliza principalmente para:

1. Realizar peticiones HTTP (GET, POST, PUT, DELETE, etc.) a APIs externas o servicios backend.

2. Interceptar solicitudes y respuestas (útil para añadir headers, manejar errores globalmente, etc.).

3. Transformar automáticamente datos (como convertir automáticamente respuestas JSON).

4. Cancelar peticiones (útil si el usuario abandona una página antes de que termine la solicitud).

5. Manejar errores de forma más clara que con fetch() (Axios rechaza la promesa solo si hay un error de red, no por códigos HTTP 4xx/5xx).

---

## Instancia de Axios

```js
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
```

Se crea una nueva instancia de Axios con una URL base predeterminada (`http://localhost:8000/api/vi`). Todas las peticiones realizadas con esta instancia usarán esta URL como prefijo.

---

## Interceptor de peticiones

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

Este interceptor se ejecuta antes de que cada petición salga del cliente. Su propósito es:

- Obtener el token de acceso almacenado en el `localStorage`.
- Si el token existe, agregar un encabezado `Authorization` con el valor `Bearer <token>` a la solicitud.
- Devolver la configuración modificada.

Esto permite manejar autenticación con tokens JWT (u otro esquema similar) de manera automática.

---

## Interceptor de respuestas

```js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```
- Maneja errores globalmente
- Si recibe un 401 (No autorizado):
- Elimina el token inválido/vencido
- Redirige al usuario al login
- Para otros errores, simplemente rechaza la promesa

## Exportación

```js
export default api;
```

Se exporta la instancia `api` para ser utilizada en otras partes de la aplicación React.

---

## Uso

En cualquier componente o archivo de la app:

```js
import api from './ruta/del/archivo/api';

api.get('/usuarios/')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

Esta instancia simplifica las solicitudes al backend, manejando automáticamente la base URL y la autenticación.
