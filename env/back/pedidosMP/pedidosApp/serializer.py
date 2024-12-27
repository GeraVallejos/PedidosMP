from rest_framework import serializers
from .models import Productos, Usuarios, Pedidos, Proveedores

class UsuariosSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = Usuarios
        fields = ['nombre', 'apellido', 'correo', 'username', 'password','cargo', 'rut' ]

class PedidosSerializer(serializers.ModelSerializer):

    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.nombre')

    
    class Meta():
        model = Pedidos
        exclude = ['id_usuario']

class ProveedoresSerializer(serializers.ModelSerializer):

    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.nombre')    
    
    class Meta():
        model = Proveedores
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):

    productos_proveedor = ProveedoresSerializer(read_only=True)
    productos_usuario = serializers.ReadOnlyField(source = 'id_usuario.id')
    
    class Meta():
        model = Productos
        fields = '__all__'

    def create(self, validated_data):
    
        # Asigna automáticamente el id_usuario del usuario autenticado
        validated_data['id_usuario'] = self.context['request'].user 
        return super().create(validated_data)