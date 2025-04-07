# Carpeta de App `migrations`

Cuando se ejecuta el comando python manage.py makemigrations por primera vez en una app, Django genera este archivo en la carpeta migrations

- Contiene las operaciones iniciales para crear las tablas en la base de datos según los modelos (models.py).
- Se ejecuta al aplicar las migraciones (python manage.py migrate).
- Es la base del historial de migraciones de la app. Django usa este archivo para saber cómo construir el esquema de la base de datos desde cero.

`__init__.py` de la carpeta migrations es un archivo vacío (o con código de inicialización), el cual indica que la carpeta migrations es un paquete Python y permite que Django cargue las migraciones correctamente.

Nunca borrar estos archivos. Si se requiere hacer modificaciones de las tablas, hay que hacerlas en el modelo y no en estos archivos directamente, luego hacer una nueva migración

## `0001_initial.py`
Esta migración inicial crea cuatro modelos principales: Usuarios, Proveedores, Productos y Pedidos.

### Modelo: Usuarios
Representa los usuarios del sistema y extiende funcionalidades del modelo de usuario de Django.

#### Tabla: usuarios

Campos principales:

- id: Identificador único (PK).
- nombre, apellido, correo, rut, cargo: Información personal.
- username: Nombre de usuario único, validado.
- password: Contraseña.
- is_active, is_staff, is_superuser: Control de permisos.
- groups, user_permissions: Relaciones con grupos y permisos.
- date_joined, last_login: Tiempos de actividad.

### Modelo: Proveedores
Contiene información sobre proveedores de productos.

#### Tabla: proveedores

Campos principales:

- id_proveedor: Identificador único (PK).
- nombre, direccion, comuna, contacto, telefono, descripcion, rut, giro: Información general del proveedor.
- fecha_creacion, fecha_modificacion: Tiempos de auditoría.
- id_usuario: FK a Usuarios, indica el creador o responsable.

### Modelo: Productos
Gestión de productos en el sistema.

#### Tabla: productos

Campos principales:

- id_producto: Identificador único (PK).
- codigo: Código único del producto.
- nombre, unidad, cantidad_stock, cantidad_inventario, bodega, descripcion, obsoleto: Detalles del producto.
- costo_compra, costo_venta: Costos asociados.
- fecha_creacion, fecha_modificacion: Tiempos de auditoría.
- id_usuario: FK a Usuarios, autor del registro.
- id_proveedor: FK a Proveedores, proveedor relacionado.

### Modelo: Pedidos
Registro de pedidos realizados.

#### Tabla: pedidos

Campos principales:

- id_pedido: Identificador único (PK).
- cantidad: Cantidad del producto pedido.
- fecha_pedido, fecha_modificacion, fecha_despacho: Fechas relevantes del pedido.
- resuelto: Indica si el pedido fue despachado.
- id_usuario: FK a Usuarios, quien realiza el pedido.
- id_producto: FK a Productos, producto solicitado.
- id_proveedor: FK a Proveedores, proveedor del pedido.