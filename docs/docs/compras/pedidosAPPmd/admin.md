# Archivo `admin.py`

Este módulo registra los modelos personalizados de la aplicación en el panel de administración de Django, permitiendo su gestión a través de la interfaz administrativa.

## Contenido del archivo

```python
from django.contrib import admin
from .models import Usuarios, Productos, Proveedores, Pedidos

# Register your models here.
admin.site.register(Usuarios)
admin.site.register(Productos)
admin.site.register(Proveedores)
admin.site.register(Pedidos)
```

El archivo es responsable de registrar los modelos definidos en models.py para que puedan ser gestionados desde el admin de Django. Al registrarlos, se habilita la creación, edición, visualización y eliminación de instancias de cada modelo directamente desde la interfaz web de administración.

Es posible extender su configuración para que sea más personalizado el contenido (columnas visibles, filtros laterales, orden por defecto, etc)

Ejemplo:
```python
class ProductosAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'cantidad_stock', 'bodega')
    search_fields = ('codigo', 'nombre')

admin.site.register(Productos, ProductosAdmin)
```