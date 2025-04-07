from django.urls import path, include
from rest_framework import routers
from .views import ProductoView, UsuarioView, PedidosView, ProveedoresView


#Se usa versionado de API en urls de pedidosApp

router = routers.DefaultRouter()
router.register(r'producto', ProductoView, 'producto')
router.register(r'usuario', UsuarioView, 'usuario')
router.register(r'pedido', PedidosView, 'pedido')
router.register(r'proveedor', ProveedoresView, 'proveedor')

urlpatterns = [path('', include(router.urls))]

