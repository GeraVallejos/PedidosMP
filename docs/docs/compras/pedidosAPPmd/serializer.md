# Archivo `serializer.py`

Este módulo define los serializers utilizados para transformar modelos en representaciones JSON (y viceversa) utilizando Django REST Framework. Los modelos involucrados son: Usuarios, Pedidos, Proveedores y Productos.

- Reciben datos complejos (modelos de Django) y los convierten a un lenguaje universal (JSON) para la API
- Y viceversa: toman datos JSON crudos y los transforman en objetos Django válidos

## Codigo del archivo

```python
class UsuariosSerializer(serializers.ModelSerializer):
    class Meta():
        model = Usuarios
        fields = ['nombre', 'apellido', 'correo', 'username', 'password','cargo', 'rut' ]
```

Serializador para el modelo Usuarios. Permite la conversión entre instancias de usuario y datos JSON. Los campos incluidos son los esenciales para registrar o visualizar un usuario.

Campos

- nombre: Nombre del usuario.
- apellido: Apellido del usuario.
- correo: Correo electrónico.
- username: Nombre de usuario para autenticación.
- password: Contraseña del usuario.
- cargo: Cargo o rol dentro de la organización.
- rut: Identificador tributario (usado en Chile).

```python
class PedidosSerializer(serializers.ModelSerializer):
    productos_usuario = serializers.ReadOnlyField(source='id_usuario.nombre')
    pedidos_producto = serializers.ReadOnlyField(source='id_producto.nombre')
    pedidos_proveedor = serializers.ReadOnlyField(source='id_proveedor.nombre')

    class Meta():
        model = Pedidos
        exclude = ['id_usuario']
```

Serializador para el modelo Pedidos. Incluye campos de solo lectura para mostrar nombres descriptivos en vez de solo IDs relacionados.

- productos_usuario: Nombre del usuario que realizó el pedido (campo derivado de id_usuario.nombre).
- pedidos_producto: Nombre del producto solicitado (id_producto.nombre).
- pedidos_proveedor: Nombre del proveedor relacionado (id_proveedor.nombre).
- Se excluye el campo id_usuario del serializador para evitar su exposición directa.

```python
class ProveedoresSerializer(serializers.ModelSerializer):
    productos_usuario = serializers.ReadOnlyField(source='id_usuario.nombre')    

    class Meta():
        model = Proveedores
        fields = '__all__'
```

Serializador para el modelo Proveedores. Muestra todos los campos del modelo, incluyendo un campo de solo lectura con el nombre del usuario creador.

- productos_usuario: Nombre del usuario asociado (id_usuario.nombre).

```python
class ProductosSerializer(serializers.ModelSerializer):
    productos_proveedor = ProveedoresSerializer(read_only=True)
    productos_usuario = serializers.ReadOnlyField(source='id_usuario.id')
    
    class Meta():
        model = Productos
        fields = '__all__'

    def create(self, validated_data):
        validated_data['id_usuario'] = self.context['request'].user 
        return super().create(validated_data)
```

Serializador para el modelo Productos. Muestra todos los campos del modelo e incluye lógica personalizada para asignar automáticamente al usuario autenticado como creador del producto.

- productos_proveedor: Muestra los datos completos del proveedor usando su serializador.
- productos_usuario: Muestra el ID del usuario asociado (solo lectura).

Método create:

- Este método sobrescribe el comportamiento por defecto para establecer automáticamente el campo id_usuario con el usuario actualmente autenticado (request.user).

1. Cuándo se ejecuta:

    - Se llama automáticamente cuando haces serializer.save() en una vista o APIView
    - Solo se activa en operaciones POST (creación), no en PUT/PATCH (actualización)

2. Parámetro validated_data:

    - Contiene todos los datos ya validados por el serializador

    - Es un diccionario con los campos del modelo y sus valores

3. self.context['request'].user:

    - Accede al usuario autenticado actual
    - self.context contiene información adicional pasada al serializador
    - request es el objeto HttpRequest de Django
    - user es el usuario autenticado haciendo la petición

4. Asignación del usuario:

    - validated_data['id_usuario'] = ... asigna el usuario al campo de relación
    - Esto asegura que el producto creado esté asociado automáticamente al usuario que lo crea

5. super().create(validated_data):

    - Llama al método create() original de ModelSerializer
    - Crea realmente la instancia en la base de datos con todos los datos modificados
    - Retorna la instancia creada

#### Flujo completo de una creación:

1. Cliente hace POST a /api/productos/ con datos del producto

2. DRF valida los datos contra el serializador

3. Si son válidos, llama a create()

4. El método añade el usuario actual a los datos validados

5. Se crea el producto en la BD con esta información adicional

6. Se retorna el producto creado (que incluye todos los campos)

#### ¿Por qué es útil?

- Seguridad: Evita que usuarios asignen manualmente el campo de usuario
- Automatización: El cliente no necesita enviar id_usuario
- Consistencia: Garantiza que siempre se asocie el usuario correcto

#### Notas generales

1. Todos los serializadores heredan de ModelSerializer para funcionalidad automática

2. Los campos ReadOnlyField son de solo lectura y no se modifican en operaciones POST/PUT

3. El contexto de la petición (self.context['request']) se usa para obtener el usuario actual

4. Los nombres de campos como productos_usuario siguen el patrón related_name definido en los modelos