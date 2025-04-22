from rest_framework import viewsets
from .serializer import ProductosSerializer, UsuariosSerializer, ProveedoresSerializer, PedidosSerializer
from .models import Productos, Usuarios, Proveedores, Pedidos
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password


class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductosSerializer
    queryset = Productos.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
 

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
        # Devuelve el usuario autenticado
        user = self.request.user  # Usuario autenticado
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def verify_password(self, request):
        password = request.data.get('password')
        
        if not password:
            return Response({'error': 'La contraseña es requerida'}, status=400)
        
        if check_password(password, request.user.password):
            return Response({'valid': True})
        else:
            return Response({'valid': False}, status=400)

class ProveedoresView(viewsets.ModelViewSet):
    serializer_class = ProveedoresSerializer
    queryset = Proveedores.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Verifica si el usuario está autenticado
        if self.request.user.is_anonymous:
            raise PermissionDenied("Debes estar autenticado para crear un proveedor.")
        serializer.save(id_usuario= self.request.user)


class PedidosView(viewsets.ModelViewSet):
    serializer_class = PedidosSerializer
    queryset = Pedidos.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(id_usuario= self.request.user)