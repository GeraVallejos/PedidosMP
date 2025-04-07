
# Archivo `views.py`

Este archivo define los **ViewSets** utilizados para manejar las operaciones CRUD en la API, usando Django REST Framework.

Cada `ViewSet` está vinculado a un modelo, un serializer, y define permisos y comportamiento personalizado en la creación de objetos.

---

### ProductoView

```python
class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductosSerializer
    queryset = Productos.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)
```

- Permite acceder a productos.
- Solo usuarios autenticados pueden crear nuevos productos.
- Al crear un producto, se asigna automáticamente el usuario autenticado como `id_usuario`.

---

### UsuarioView

```python
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = Usuarios.objects.all()
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        user = serializer.save()
        # Hashear password
        user.set_password(user.password)
        user.save()

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def actual(self, request):
        user = self.request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)
```

- Permite acceder a los usuarios y registrar nuevos.
- Contraseñas se hashean correctamente al guardar.
- La acción personalizada `actual` permite obtener los datos del usuario autenticado (`GET /usuario/actual/`).

---

### ProveedoresView

```python
class ProveedoresView(viewsets.ModelViewSet):
    serializer_class = ProveedoresSerializer
    queryset = Proveedores.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            raise PermissionDenied("Debes estar autenticado para crear un proveedor.")
        serializer.save(id_usuario=self.request.user)
```

- Gestiona operaciones sobre proveedores.
- Solo usuarios autenticados pueden crear un nuevo proveedor.
- Si el usuario no está autenticado, se lanza un error.

---

### PedidosView

```python
class PedidosView(viewsets.ModelViewSet):
    serializer_class = PedidosSerializer
    queryset = Pedidos.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(id_usuario=self.request.user)
```

- Permite crear y consultar pedidos.
- Solo usuarios autenticados pueden crear pedidos.
- El usuario autenticado se asigna automáticamente al nuevo pedido.

---

### Permisos utilizados

- `IsAuthenticatedOrReadOnly`: los usuarios autenticados pueden crear/modificar; los no autenticados solo pueden leer.
- `IsAdminUser`: los usuarios que son admin pueden registrar nuevos usuarios

---

### Características

1. Definición de la clase
    - viewsets.ModelViewSet: Hereda de esta clase para obtener todas las operaciones CRUD (Create, Read, Update, Delete) automáticamente.

2. Configuración del serializador
    - UsuariosSerializer: Define qué serializador se usará para convertir los objetos Usuario a/desde JSON.


3. Consulta base
    - Usuarios.objects.all(): Establece que por defecto trabajará con todos los usuarios registrados.
    - Este queryset se usa para las operaciones de listado y recuperación.

4. Permisos por defecto
    - permissions.IsAdminUser: Permite que solo el usuario registrado como admin (superusuario) acceda a los endpoints principales.

5. Método para personalizar la creación
    - Se ejecuta durante la creación de un nuevo usuario.
    - serializer: Contiene los datos validados del nuevo usuario.

6. Guardado inicial
    - user = serializer.save(): Crea el objeto usuario en la base de datos (pero con password en texto plano).

7. Hasheo de contraseña
    - set_password(): Método de Django que hashea la contraseña antes de almacenarla.
    - Esencial para seguridad (nunca almacenar passwords en texto plano).

8. Guardado final
    - user.save(): Actualiza el usuario con la contraseña hasheada.

### Acción personalizada

- @action: Decorador que crea un endpoint personalizado.
- detail=False: Es una acción a nivel de colección (no de un usuario específico).
- methods=['get']: Solo acepta peticiones GET.
- permission_classes=[permissions.IsAuthenticated]: Requiere autenticación (a diferencia de los permisos por defecto).
- actual: Nombre del endpoint (accesible en /usuarios/actual/).
- request: Objeto con los datos de la petición HTTP.
- self.request.user: Devuelve el usuario autenticado que hizo la petición.
- self.get_serializer(): Usa el UsuariosSerializer definido al inicio.
- Convierte el objeto usuario a formato JSON.
- Devuelve los datos serializados del usuario actual con código 200 OK.
