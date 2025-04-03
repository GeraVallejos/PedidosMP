# <font color=#ff5733>Django Settings - Proyecto Compras</font>

Este archivo contiene la configuración básica para el proyecto **pedidosMP**, creado con **Django 5.1.4**

## Configuración y explicación de los parámetros de settings

### <font color=#ad39dc> BASE_DIR</font>
Define la raíz del proyecto, que es utilizada para la construcción de rutas dentro del mismo.
<font color='blue'>BASE_DIR = Path(__file__).resolve().parent.parent</font>

### <font color=#ad39dc>SECRET_KEY`</font>

La clave secreta utilizada en la producción para la seguridad de las sesiones y el manejo de cookies. Nunca se debe compartir esta clave.

El SECRET_KEY es una cadena aleatoria crítica que Django utiliza para proporcionar seguridad criptográfica al proyecto. Es generada automáticamente cuando creas un nuevo proyecto Django con startproject.

Funciones principales:

- Seguridad de sesiones: Se usa para firmar las cookies de sesión
- Protección CSRF: Genera y verifica tokens CSRF
- Sistema de mensajes: Firma los mensajes flash
- Funciones criptográficas: Para generación de hashes y firmas
- Algunos backends de almacenamiento: Como signed_cookies

¿Cómo se utiliza?
Django usa internamente el SECRET_KEY en múltiples componentes sin que necesariamente tengas que interactuar directamente con él.

#### Ejemplos:

- En el sistema de sesiones  
request.session['user_id'] = 42  # Se firma con SECRET_KEY

- En protección CSRF  
{% csrf_token %}  # El token generado usa SECRET_KEY

- En el sistema de mensajes  
messages.success(request, "Éxito!")  # El mensaje se firma

#### Buenas prácticas
- Nunca comprometerlo: No subir a repositorios públicos
- Entorno de producción: Usar diferentes keys para desarrollo y producción
- Rotación: Si se compromete, generar uno nuevo (pero afectará sesiones existentes)
- Almacenamiento seguro: Usar variables de entorno en producción:  
**settings.py (forma recomendada)**  
import os  
<font color='blue'>SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')</font>

### <font color=#ad39dc>DEBUG</font>

El modo debug es una configuración fundamental que afecta el comportamiento de la aplicación Django de varias formas importantes:

##### 1. Muestra información detallada de errores
Cuando ocurre un error, Django muestra una página completa con:

- El traceback completo
- Valores de variables locales
- Consultas SQL ejecutadas
- Configuración relevante

##### 2. Habilita herramientas de desarrollo
- Panel de debug (cuando se usa django-debug-toolbar)
- Listado de archivos estáticos
- Información detallada en consola

##### 3. Desactiva ciertas optimizaciones
- Las plantillas se recargan automáticamente al cambiar
- No se cachean ciertos elementos

##### 4. Permite archivos estáticos locales
- Django sirve archivos estáticos (CSS, JS) directamente
- No requiere configurar un servidor web separado (como Nginx)

##### Peligros de tener DEBUG = True en producción
⚠️ Nunca se debe activar DEBUG en producción porque:

- Expone información sensible (configuraciones, rutas de archivos)
- Permite ejecutar código Python a través de la consola de debug
- Muestra detalles de implementación que pueden ayudar a atacantes

##### ¿Qué ocurre cuando DEBUG=False?  
- Los errores muestran mensajes genéricos (500, 404)
- Se debe configurar ALLOWED_HOSTS
- Django no sirve archivos estáticos (debes usar Whitenoise o servidor web)
- Se activan optimizaciones de rendimiento

### <font color=#ad39dc>ALLOWED_HOSTS</font>

Es una lista de strings que representa los nombres de host/dominios que tu sitio Django puede servir. Cuando DEBUG=False (en producción), Django solo responderá a requests que incluyan un header Host que coincida con uno de los valores en esta lista.

- Seguridad: Previene ataques de HTTP Host header poisoning.
- Validación: Asegura que la aplicación solo responda a los dominios que se ha especificado.
- Requerimiento obligatorio: Cuando DEBUG=False, Django requiere que esta lista no esté vacía.

#### Buenas prácticas
- En desarrollo local se puede dejar vacío si DEBUG=True
- En producción siempre se debe especificar los dominios exactos
- Nunca usar ['*'] en producción a menos que sea absolutamente necesario
- Para entornos como Heroku, es necesario incluir el dominio de la plataforma

### <font color=#ad39dc>INSTALLED_APPS</font>

Es una lista/tupla que contiene los nombres de todas las aplicaciones Django que están activas en el proyecto. Incluye tanto aplicaciones integradas de Django como aplicaciones de terceros y las que desarrollan por el usuario.

1. Registra aplicaciones: Le dice a Django qué componentes de aplicación deben ser incluidos en el proyecto
2. Habilita funcionalidades: Cada app registrada puede aportar:
    - Modelos de base de datos
    - Migraciones
    - Vistas (views)
    - Templates
    - Archivos estáticos
    - Comandos de gestión personalizados
3. Ordena la carga: Las apps se cargan en el orden especificado (importante para dependencias entre apps)

#### Aplicaciones importantes por defecto  
<font color='blue'>django.contrib.admin:</font> Interfaz de administración  
<font color='blue'>django.contrib.auth:</font> Sistema de autenticación  
<font color='blue'>django.contrib.contenttypes:</font> Framework para tipos de contenido  
<font color='blue'>django.contrib.sessions:</font> Manejo de sesiones  
<font color='blue'>django.contrib.messages:</font> Sistema de mensajes  
<font color='blue'>django.contrib.staticfiles:</font> Manejo de archivos estáticos  

##### Buenas prácticas

1. Orden recomendado:

    - Apps de Django core primero
    - Apps de terceros después
    - Tus apps locales al final

2. Registrar las apps: Usar la configuración de la app (AppConfig) en lugar del nombre simple:  
<font color='blue'>'miapp.apps.MiappConfig'</font>  
3. Mantenimiento: Agregar nuevas apps cuando se instalen paquetes o se creen nuevas aplicaciones.
4. No eliminar apps core sin entender sus dependencias, ya que muchas características de Django dependen de ellas.

Esta configuración es esencial para que Django sepa qué componentes debe cargar y cómo deben interactuar entre sí en el proyecto.

### <font color=#ad39dc>MIDDLEWARE</font>

Es una lista de clases que procesan las solicitudes (requests) y respuestas (responses) globalmente antes de que lleguen a las vistas o después de que estas generen una respuesta. Actúa como una serie de capas intermedias que pueden modificar, validar o realizar acciones adicionales en cada petición HTTP.

Cada middleware se ejecuta en el orden definido en settings.py y puede realizar operaciones como:

- Procesar el request antes de que llegue a la vista (ej: autenticación, CORS, seguridad)
- Procesar la respuesta antes de enviarla al cliente (ej: compresión, cookies, headers)
- Manejar excepciones globalmente (ej: errores 404, 500)
- Modificar o añadir datos al request/response (ej: user session, idioma, timezone)

#### Estructura típica en settings.py
<pre>
<code>
MIDDLEWARE = [
    
<font color='blue'>'django.middleware.security.SecurityMiddleware'</font>: Seguridad básica (HTTPS, headers)
<font color='blue'>'django.contrib.sessions.middleware.SessionMiddleware'</font>: Manejo de sesiones
<font color='blue'>'django.middleware.common.CommonMiddleware'</font>: Procesamiento de URLs
<font color='blue'>'django.middleware.csrf.CsrfViewMiddleware'</font>: Protección CSRF
<font color='blue'>'django.contrib.auth.middleware.AuthenticationMiddleware'</font>: Autenticación de usuarios
<font color='blue'>'django.contrib.messages.middleware.MessageMiddleware'</font>: Mensajes flash
<font color='blue'>'django.middleware.clickjacking.XFrameOptionsMiddleware'</font>: Protección contra clickjacking
    
Middleware de terceros (ej: CORS)  
<font color='blue'>'corsheaders.middleware.CorsMiddleware'</font>
    
Middleware personalizado (si lo tienes)  
<font color='blue'>'miapp.middleware.CustomMiddleware'</font>  
]
</code>
</pre>

#### Buenas prácticas
- El orden importa: Algunos middleware dependen de otros (ej: SessionMiddleware debe ir antes que AuthenticationMiddleware)
- No abusar: Cada middleware añade overhead a cada petición
- Usar middleware de terceros solo si es necesario (ej: corsheaders, debug_toolbar)

### <font color=#ad39dc>ROOT_URLCONF</font>

- Define el archivo principal de URLs: Le dice a Django dónde encontrar las rutas (URL patterns) que debe usar para mapear las URLs a las vistas correspondientes.
- Punto de entrada para el enrutamiento: Cuando llega una solicitud HTTP, Django consulta este archivo para determinar qué vista debe ejecutarse.
- Por defecto, Django lo configura automáticamente al crear un proyecto, pero puedes modificarlo si necesitas un esquema de URLs más complejo.

### <font color=#ad39dc>TEMPLATES</font>

Define cómo el sistema de plantillas (templates) debe cargar y procesar los archivos HTML (o cualquier formato de plantilla) de la aplicación

- Define motores de plantillas: Es una lista de configuraciones que le indica a Django qué backend de plantillas usar (generalmente el de Django o Jinja2)
- Configura ubicaciones de templates: Especifica dónde buscar archivos de plantillas (en apps, directorios globales, etc.)
- Habilita funcionalidades adicionales: Como procesadores de contexto, autoescape (seguridad contra XSS), y opciones de depuración

<pre>
<code>
TEMPLATES = [  
        {  
        <font color='blue'>'BACKEND': 'django.template.backends.django.DjangoTemplates':</font> Motor de Django  
        <font color='blue'>'DIRS': [os.path.join(BASE_DIR, 'templates')]</font> Directorios globales  
        <font color='blue'>'APP_DIRS': True:</font> Busca templates dentro de cada app  
                'OPTIONS': {  
            <font color='blue'>'context_processors'</font>: [  
                # Procesadores de contexto (variables disponibles en todas las plantillas)  
                <font color='blue'>'django.template.context_processors.debug',  
                'django.template.context_processors.request',  
                'django.contrib.auth.context_processors.auth',  
                'django.contrib.messages.context_processors.messages'</font>,  
            ],
        },
    },
]
</code>
</pre>
### <font color=#ad39dc>WSGI_APPLICATION</font>

Especifica qué aplicación WSGI (Web Server Gateway Interface) utilizará tu proyecto para servir la aplicación web. WSGI es el estándar de Python para comunicar servidores web con aplicaciones web.

- Define la ruta hacia el objeto callable de WSGI que el servidor usará para iniciar tu aplicación Django.
- Por defecto, Django crea un archivo wsgi.py en tu proyecto, que contiene este objeto callable (application).

Valor por defecto: <font color='blue'>WSGI_APPLICATION = 'tu_proyecto.wsgi.application'</font>

Si se desplega Django en un servidor de producción, se necesita WSGI para que el servidor web pueda ejecutar la aplicación correctamente. En desarrollo, Django usa su propio servidor (runserver), que no necesita WSGI.

### <font color=#ad39dc>DATABASES</font>

Define cómo el proyecto se conecta a una o varias bases de datos. Django soporta múltiples motores de bases de datos (PostgreSQL, MySQL, SQLite, Oracle, etc.) y permite configurar conexiones a varias bases de datos si es necesario

Es un diccionario que contiene la configuración de conexión a la(s) base(s) de datos. Por defecto, Django usa SQLite, pero es posible cambiarlo a la BD que se requiera

#### Ejemplo con MySQL

<pre>
<code>
DATABASES = {  
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mi_bd',
        'USER': 'root',
        'PASSWORD': 'password123',
        'HOST': 'localhost',
        'PORT': '3306',
    }
} 
</code>
</pre>

##### Tips
Hay que instalar los drivers necesarios para cada BD  
MySQL: pip install mysqlclient

### <font color=#ad39dc>AUTH_PASSWORD_VALIDATORS</font>

Define reglas de validación para asegurar que las contraseñas de los usuarios sean seguras. Por defecto, Django incluye varios validadores que verifican complejidad, similitud con el nombre de usuario, uso de contraseñas comunes, etc.

#### Validadores disponibles

| Validador (NAME) | Descripción | Opciones configurables |
|----------|----------|----------|
| UserAttributeSimilarityValidator    | Evita contraseñas similares al nombre de usuario, email, etc.   | user_attributes (atributos a comparar), max_similarity (0 a 1)   |
| MinimumLengthValidator    | Exige una longitud mínima   | min_length (por defecto 8)   |
| CommonPasswordValidator    | Bloquea contraseñas comunes (como "123456")  | password_list_path (ruta a una lista personalizada)   |
| NumericPasswordValidator    | Evita contraseñas solo numéricas   |    |

Se pueden modificar sus parámetros o desactivarlos:

<pre>
<code>
{
    'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    'OPTIONS': {
        'min_length': 10,  # Ahora requiere al menos 10 caracteres
    }
},
</code>
</pre>

Ajustar la similitud con atributos del usuario

<pre>
<code>
{
    'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    'OPTIONS': {
        'user_attributes': ('username', 'email', 'first_name'),
        'max_similarity': 0.5,  # Más estricto (por defecto: 0.7)
    }
},
</code>
</pre>

### <font color=#ad39dc>LANGUAGE_CODE</font>

Define el idioma predeterminado de tu aplicación. Controla aspectos como:

- Traducciones de textos en templates, formularios y mensajes del sistema.
- Formato de fechas, números y horas.
- Comportamiento de la internacionalización (i18n) y localización (l10n).

#### Usos

1. Traducciones automáticas  
    - Django usa este valor para cargar los archivos de traducción correspondientes (si están disponibles en locale/).

2. Formatos regionales

    - Fechas (DATE_FORMAT, DATETIME_FORMAT).
    - Números (separador decimal, miles).
    - Horas (formato 12h/24h).

3. Mensajes del sistema
    - Errores de formularios, mensajes del admin, etc., aparecerán en el idioma configurado.

4. Middleware de internacionalización
    - Si usas django.middleware.locale.LocaleMiddleware, permite cambiar el idioma dinámicamente basado en la preferencia del usuario.

### <font color=#ad39dc>TIME_ZONE</font>

Define la zona horaria predeterminada para la aplicación. Controla cómo Django maneja:

- Fechas y horas en la base de datos.
- Visualización de tiempos en templates y formularios.
- Comportamiento de funciones sensibles al tiempo (como timezone.now())

#### USE_TZ (Usar Zonas Horarias)

- **Si USE_TZ = True**  (recomendado), Django trabaja con zonas horarias (UTC + conversión).
- **Si USE_TZ = False**, Usa la hora local del servidor (no recomendado para apps globales).

#### USE_I18N

Habilita o deshabilita el sistema de internacionalización (i18n) del framework. La internacionalización permite adaptar la aplicación a diferentes idiomas y regiones sin cambios en el código base.

#### Ejemplo

<pre>
<code>
TIME_ZONE = "America/Santiago"  # Hora de Chile
USE_TZ = True  # ¡Siempre activado!
USE_I18N = True
</code>
</pre>

### <font color=#ad39dc>STATIC_URL</font>

Define la URL base desde la que se servirán los archivos estáticos (CSS, JavaScript, imágenes, etc.) en la aplicación. Permite a Django saber dónde encontrar y cómo servir los archivos estáticos.

#### TIPS

- Durante el desarrollo, Django sirve los archivos estáticos automáticamente.
- En producción, es primordial configurar el servidor web para servir estos archivos y nunca depender de Django para este propósito por razones de rendimiento y seguridad.

### <font color=#ad39dc>DEFAULT_AUTO_FIELD</font>

Define el tipo de campo automático predeterminado que se usará para las claves primarias (primary keys) en los modelos cuando no se especifique explícitamente un campo primary_key=True

- Valor por defecto: <font color='blue'>'django.db.models.BigAutoField'</font>, entero de 64 bits
- El campo id se creará automáticamente usando el tipo especificado en DEFAULT_AUTO_FIELD

### <font color=#ad39dc>AUTH_USER_MODEL</font>

Especifica qué modelo debe usar Django para representar a los usuarios. Por defecto, Django usa su propio modelo User, pero puedes reemplazarlo con tu propio modelo personalizado

<pre>
<code>
AUTH_USER_MODEL = 'auth.User'  # Modelo User estándar de Django
</code>
</pre>

*Este proyecto tiene un modelo de usuario personalizado*

<pre>
<code>
AUTH_USER_MODEL = "pedidosApp.Usuarios"
</code>
</pre>

### <font color=#ad39dc>CORS_ALLOWED_ORIGINS</font>

Es una configuración importante cuando la API Django necesita ser accedida desde frontends que se ejecutan en diferentes dominios (Cross-Origin Resource Sharing). En este caso por REACT

#### ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del navegador que restringe las solicitudes HTTP entre diferentes orígenes (dominios). Cuando el frontend (ej. React en http://localhost:3000) intenta acceder a la API Django (ej. http://api.midominio.com), el navegador bloquea la solicitud por razones de seguridad a menos que el servidor permita explícitamente el acceso

#### Configurción de CORS
1. Para habilitar CORS es necesario el paquete django-cors-headers:

    <pre>
    <code>
    pip install django-cors-headers
    </code>
    </pre>

2. Agregar a INSTALLED_APPS:

    <pre>
    <code>
    INSTALLED_APPS = [
        ...
        'corsheaders',
        ...
    ]
    </code>
    </pre>
3. Agregar el middleware (debe estar lo más arriba posible):

   <pre>
    <code>
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',  # ¡Debe estar antes de CommonMiddleware!
        ...
        'django.middleware.common.CommonMiddleware',
        ...
    ]
    </code>
    </pre>

*En este proyecto*

<pre>
<code>
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173' # Es el dominio por defecto de Vite
]
</code>
</pre>

### <font color=#ad39dc>REST_FRAMEWORK</font>

Configuración principal para personalizar el comportamiento de Django REST Framework (DRF), el toolkit más popular para construir APIs REST con Django.

#### ¿Que es DRF?

- Simplifica la creación de APIs RESTful
- Proporciona serializadores para conversión de datos
- Ofrece vistas genéricas y viewsets para endpoints comunes
- Incluye autenticación, permisos y throttling
- Soporta múltiples formatos (JSON, XML, etc.)

<pre>
<code>
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Para que solo los usuarios autenticados puedan acceder
    ],
}
</code>
</pre>
****Revisar documentacion de DRF***

### <font color=#ad39dc>SIMPLE_JWT</font>

Personaliza el comportamiento de JSON Web Tokens (JWT) cuando se usa el paquete djangorestframework-simplejwt con Django REST Framework

JWT (JSON Web Token) es un estándar para autenticación que usa tokens:

- Estructura: Header.Payload.Signature
- Ventajas: Stateless, escalable, seguro
- Usos comunes: APIs RESTful, autenticación en SPA, microservicios

Primero se instala el paquete:
<font color='blue'>pip install djangorestframework-simplejwt</font>

<pre>
<code>
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=360), # Tiempo de vida del token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),     # Tiempo de vida del token de refresco
    'ROTATE_REFRESH_TOKENS': True,                   # Genera nuevo refresh token en cada refresh
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),                # Prefijo esperado en el encabezado
}
</code>
</pre>

#### Buenas prácticas
1. Seguridad:
    - Usar ACCESS_TOKEN_LIFETIME corto (15-30 minutos)

2. Configura REFRESH_TOKEN_LIFETIME más largo (7-30 días)
    - En producción usar AUTH_COOKIE_SECURE = True

3. Performance:
    - Considerar usar BLACKLIST_AFTER_ROTATION = False para evitar consultas a la DB

4. Customización:
    - Extender los serializers para añadir datos personalizados al token
    - Implementar lógica de logout con blacklist si es necesario

### <font color=#ad39dc>CORS_ALLOW_HEADERS</font>

Es una configuración del paquete django-cors-headers que especifica qué cabeceras HTTP pueden ser incluidas en las solicitudes entre dominios (CORS) a la aplicación Django

- Propósito: Define los nombres de los headers HTTP que los navegadores pueden incluir cuando hacen solicitudes CORS al backend
- Importancia: Si un header necesario no está en esta lista, el navegador bloqueará la solicitud
- Relación: Trabaja junto con CORS_ALLOWED_ORIGINS para controlar el acceso a la API

#### ¿Cómo verificar qué headers necesita tu aplicación?
- Revisa los errores CORS en la consola del navegador
- Verifica los headers que envía tu frontend
- Inspecciona las solicitudes con las herramientas de desarrollador

<pre>
<code>
CORS_ALLOW_HEADERS = [
    'authorization',  # Permitir encabezado 'Authorization'
    'content-type',
    'accept',
    'x-requested-with',
]
</code>
</pre>





