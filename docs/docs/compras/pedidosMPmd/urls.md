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
- Las rutas de autenticación JWT (api/token/) se manejan directamente en el archivo principal.

## include()

La función include() de Django (importada desde django.urls) permite "incluir" otras configuraciones de URLs desde aplicaciones o módulos externos. Su propósito es:

1. Modularizar las URLs:

    - Divide las rutas del proyecto en archivos separados (por app) para mantener el código organizado.

    - Ejemplo: Las URLs de la app pedidosApp están definidas en su propio pedidosApp/urls.py, no en el archivo principal.

2. Anidar rutas bajo un prefijo común:

    - Todas las URLs de la app incluida se agrupan bajo una ruta base (ej: /api/v1/).

3. Estructura:

    - Cuando un usuario visita una URL que comienza con api/v1/, Django delega el procesamiento a las rutas definidas en pedidosApp/urls.py.

    - Ejemplo: Si pedidosApp/urls.py tiene una ruta path('pedidos/', ...), la URL final será api/v1/pedidos/

4. Ventajas:

    - Escalabilidad: Puedes añadir más apps sin saturar el archivo principal.
    - Reusabilidad: La app pedidosApp podría usarse en otro proyecto sin modificar sus URLs internas.
    - Mantención: sin include() se tendrían que definir todas las urls en el archivo principal, lo que generaría un archivo muy grande y podría crear acoplamiento entre el proyecto y la app

#### Flujo de una petición con include()

1. El usuario visita: https://tudominio.com/api/v1/pedidos/

2. Django:

    - Revisa urlpatterns principal y encuentra que api/v1/ delega a pedidosApp.urls.

    - Elimina la parte coincidente (api/v1/) y pasa el resto (pedidos/) a pedidosApp/urls.py.

3. pedidosApp/urls.py resuelve la ruta restante y llama a la vista correspondiente.
