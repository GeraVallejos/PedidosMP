from django.db import models
from django.contrib.auth.models import AbstractUser
import django.contrib.auth.validators


# Create your models here.

from django.db import models


class Pedidos(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    cantidad = models.IntegerField()
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    fecha_despacho = models.DateTimeField(blank=True, null=True)
    resuelto = models.BooleanField(default=False)
    id_producto = models.ForeignKey('Productos', models.DO_NOTHING, db_column='id_producto', related_name='pedidos_producto')
    id_proveedor = models.ForeignKey('Proveedores', models.DO_NOTHING, db_column='id_proveedor', related_name='pedidos_proveedor')
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id', related_name='pedidos_usuario')
    
    class Meta:
        managed = True
        db_table = 'pedidos'


class Productos(models.Model):
    id_producto = models.AutoField(primary_key=True)
    codigo = models.CharField(unique=True, max_length=45)
    nombre = models.CharField(max_length=45)
    unidad = models.CharField(max_length=45, blank=True, null=True)
    cantidad_stock = models.CharField(max_length=45)
    cantidad_inventario = models.CharField(max_length=45, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    costo_compra = models.IntegerField(blank=True, null=True)
    costo_venta = models.IntegerField(blank=True, null=True)
    bodega = models.CharField(max_length=45)
    id_proveedor = models.ForeignKey('Proveedores', models.DO_NOTHING, db_column='id_proveedor', related_name='productos_proveedor')
    descripcion = models.CharField(max_length=200, blank=True, null=True)
    obsoleto = models.BooleanField( default=False)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id', related_name='productos_usuario')

    class Meta:
        managed = True
        db_table = 'productos'


class Proveedores(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    direccion = models.CharField(max_length=45)
    comuna = models.CharField(max_length=45)
    contacto = models.CharField(max_length=45, blank=True, null=True)
    telefono = models.CharField(max_length=45, blank=True, null=True)
    descripcion = models.CharField(max_length=45, blank=True, null=True)
    rut = models.CharField(unique=True, max_length=45)
    giro = models.CharField(max_length=45, blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    id_usuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='id', related_name='proveedor_usuario')

    class Meta:
        managed = True
        db_table = 'proveedores'


class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=45)
    apellido = models.CharField(max_length=45)
    correo = models.CharField(max_length=45)
    username = models.CharField(error_messages={'unique': 'Este Nombre de Usuario ya existe'}, max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='Nombre de Usuario')
    password = models.CharField(max_length=200)
    cargo = models.CharField(max_length=45, blank=True, null=True)
    rut = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = True
        db_table = 'usuarios'
