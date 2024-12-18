from django.contrib import admin
from .models import Usuarios, Productos, Proveedores, Pedidos

# Register your models here.
admin.site.register(Usuarios)
admin.site.register(Productos)
admin.site.register(Proveedores)
admin.site.register(Pedidos)
