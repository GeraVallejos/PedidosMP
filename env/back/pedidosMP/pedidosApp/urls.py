from django.urls import path, include
from rest_framework import routers
from .views import ProductoView, UsuarioView, PedidosView, ProveedoresView


#Se usa versionado de API

router = routers.DefaultRouter()
router.register(r'producto', ProductoView, 'producto')
router.register(r'usuario', UsuarioView, 'usuario')
router.register(r'pedidos', PedidosView, 'pedido')
router.register(r'proveedor', ProveedoresView, 'proveedor')

urlpatterns = [path('', include(router.urls))]

