from rest_framework import serializers
from .models import Productos, Usuarios, Pedidos, Proveedores

class ProductosSerializer(serializers.ModelSerializer):

    productos_proveedor = serializers.ReadOnlyField(source ='id_proveedor.nombre')
    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.nombre')
    
    class Meta():
        model = Productos
        exclude = ['id_usuario']

class UsuariosSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = Usuarios
        fields = '__all__'

class PedidosSerializer(serializers.ModelSerializer):

    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.nombre')

    
    class Meta():
        model = Pedidos
        exclude = ['id_usuario']

class ProveedoresSerializer(serializers.ModelSerializer):

    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.nombre')    
    
    class Meta():
        model = Proveedores
        exclude = ['id_usuario']
