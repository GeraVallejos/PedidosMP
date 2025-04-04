# Archivo `urls.py`

Este archivo define la configuración principal de rutas (`URLs`) del proyecto Django `pedidosMP`. Se encarga de conectar las rutas entrantes con las vistas correspondientes.

## Contenido del archivo

<pre>
<code>
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('pedidosApp.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
</code>
</pre>

### Explicación

- **from django.contrib import admin**: Importa la vista de administración de Django.

- **from django.urls import path, include**: Importa funciones para definir rutas (path) y para incluir configuraciones de URL de otras aplicaciones (include).

- **from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView**: Importa vistas para obtener y refrescar tokens JWT usando SimpleJWT, una librería para autenticación segura basada en tokens.

#### Lista de urlpatterns

- **admin/**: Ruta al panel de administración de Django.

- **api/v1/**: Incluye las rutas definidas en pedidosApp.urls, lo que permite modularizar las URLs por aplicación.

- **api/token/**: Endpoint para obtener un par de tokens (access y refresh) usando credenciales de usuario.

- **api/token/refresh/**: Endpoint para renovar el token de acceso usando un token de refresco válido.

#### Buenas prácticas

- Prefijar las APIs con /api/v1/ es útil para versionar la API desde el inicio.
- Centralizar la autenticación JWT en el archivo raíz de URLs permite un control más claro sobre la seguridad del proyecto.