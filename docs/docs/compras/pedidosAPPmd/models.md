# Archivo `models.py`

Esta sección describe los modelos utilizados en la app `pedidosApp`. Cada modelo representa una tabla en la base de datos y define las relaciones entre entidades clave del sistema.

---

## Modelo: `Usuarios`

Extiende el modelo `AbstractUser` de Django para representar a los usuarios del sistema.

**Tabla:** `usuarios`

### Campos:

| Campo       | Tipo            | Descripción                                            |
|-------------|------------------|--------------------------------------------------------|
| `nombre`    | `CharField`      | Nombre del usuario.                                   |
| `apellido`  | `CharField`      | Apellido del usuario.                                 |
| `correo`    | `CharField`      | Correo electrónico del usuario.                       |
| `username`  | `CharField`      | Nombre de usuario único.                              |
| `password`  | `CharField`      | Contraseña del usuario.                               |
| `cargo`     | `CharField`      | Cargo o rol del usuario.                              |
| `rut`       | `CharField`      | RUT único del usuario.                                |

---

## Modelo: `Proveedores`

Contiene información de proveedores externos.

**Tabla:** `proveedores`

### Campos:

| Campo            | Tipo            | Descripción                          |
|------------------|------------------|--------------------------------------|
| `id_proveedor`   | `AutoField`      | Identificador único del proveedor.  |
| `nombre`         | `CharField`      | Nombre del proveedor.               |
| `direccion`      | `CharField`      | Dirección del proveedor.            |
| `comuna`         | `CharField`      | Comuna del proveedor.               |
| `contacto`       | `CharField`      | Nombre del contacto (opcional).     |
| `telefono`       | `CharField`      | Teléfono de contacto (opcional).    |
| `descripcion`    | `CharField`      | Descripción del proveedor.          |
| `rut`            | `CharField`      | RUT único del proveedor.            |
| `giro`           | `CharField`      | Giro comercial (opcional).          |
| `fecha_creacion` | `DateTimeField`  | Fecha de creación del registro.     |
| `fecha_modificacion` | `DateTimeField` | Fecha de última modificación.    |
| `id_usuario`     | `ForeignKey`     | Usuario que registró al proveedor.  |

---

## Modelo: `Productos`

Registra los productos disponibles en el sistema.

**Tabla:** `productos`

### Campos:

| Campo               | Tipo            | Descripción                          |
|---------------------|------------------|--------------------------------------|
| `id_producto`       | `AutoField`      | ID único del producto.              |
| `codigo`            | `CharField`      | Código único del producto.          |
| `nombre`            | `CharField`      | Nombre del producto.                |
| `unidad`            | `CharField`      | Unidad de medida (opcional).        |
| `cantidad_stock`    | `CharField`      | Cantidad actual en stock.           |
| `cantidad_inventario` | `CharField`    | Inventario físico (opcional).       |
| `fecha_creacion`    | `DateTimeField`  | Fecha de creación del registro.     |
| `fecha_modificacion`| `DateTimeField`  | Última modificación del registro.   |
| `costo_compra`      | `IntegerField`   | Costo de adquisición (opcional).    |
| `costo_venta`       | `IntegerField`   | Precio de venta (opcional).         |
| `bodega`            | `CharField`      | Bodega donde se encuentra.          |
| `descripcion`       | `CharField`      | Descripción adicional (opcional).   |
| `obsoleto`          | `BooleanField`   | Indica si el producto está en desuso. |
| `id_proveedor`      | `ForeignKey`     | Proveedor asociado.                 |
| `id_usuario`        | `ForeignKey`     | Usuario que creó el registro.       |

---

## Modelo: `Pedidos`

Registra las órdenes de compra realizadas.

**Tabla:** `pedidos`

### Campos:

| Campo             | Tipo            | Descripción                              |
|-------------------|------------------|------------------------------------------|
| `id_pedido`       | `AutoField`      | ID único del pedido.                     |
| `cantidad`        | `IntegerField`   | Cantidad solicitada.                     |
| `fecha_pedido`    | `DateTimeField`  | Fecha en que se realizó el pedido.       |
| `fecha_modificacion` | `DateTimeField` | Fecha de última modificación.          |
| `fecha_despacho`  | `DateTimeField`  | Fecha de despacho (opcional).           |
| `resuelto`        | `BooleanField`   | Indica si el pedido ya fue atendido.    |
| `id_producto`     | `ForeignKey`     | Producto solicitado.                     |
| `id_proveedor`    | `ForeignKey`     | Proveedor asociado al pedido.            |
| `id_usuario`      | `ForeignKey`     | Usuario que realizó el pedido.          |


### class Meta

Esta clase se utiliza para configurar metadatos adicionales para el modelo de Django. Los metadatos ayudan a Django a entender la intención detrás del modelo sin necesidad de modificar la lógica base del ORM. Los metadatos son configuraciones adicionales que le indican a Django cómo debe comportarse el modelo, más allá de la definición básica de campos. En resumen son instrucciones sobre cómo manejar todos los registros.

Cada modelo incluye la opción `managed = True`, lo que indica que Django debe manejar las migraciones para estas tablas, y `db_table` define el nombre exacto de la tabla en la base de datos.

La clase Meta puede contener muchas otras opciones como:

- ordering: Para definir el orden por defecto de los resultados
- verbose_name: Nombre legible para el modelo
- unique_together: Para definir conjuntos de campos que deben ser únicos
- indexes: Para definir índices de base de datos

La clase Meta posee ciertas caracteristicas:

- No hereda de ninguna clase base de Django.
- Es un patrón de diseño que Django utiliza para agrupar configuraciones adicionales del modelo.
- El nombre Meta es obligatorio - Django lo busca específicamente.

Cuando Django procesa el modelo:

- Busca una clase anidada llamada Meta
- Toma sus atributos y los convierte en metadatos del modelo
- Estos metadatos se almacenan en el atributo _meta del modelo (que es una instancia de django.db.models.options.Options)