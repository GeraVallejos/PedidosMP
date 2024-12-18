# Generated by Django 5.1.4 on 2024-12-18 19:30

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('nombre', models.CharField(max_length=45)),
                ('apellido', models.CharField(max_length=45)),
                ('correo', models.CharField(max_length=45)),
                ('username', models.CharField(error_messages={'unique': 'Este Nombre de Usuario ya existe'}, max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='Nombre de Usuario')),
                ('password', models.CharField(max_length=200)),
                ('cargo', models.CharField(blank=True, max_length=45, null=True)),
                ('rut', models.CharField(max_length=45, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'usuarios',
                'managed': True,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Proveedores',
            fields=[
                ('id_proveedor', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=45)),
                ('direccion', models.CharField(max_length=45)),
                ('comuna', models.CharField(max_length=45)),
                ('contacto', models.CharField(blank=True, max_length=45, null=True)),
                ('telefono', models.CharField(blank=True, max_length=45, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=45, null=True)),
                ('rut', models.CharField(max_length=45, unique=True)),
                ('giro', models.CharField(blank=True, max_length=45, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True)),
                ('id_usuario', models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, related_name='proveedor_usuario', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'proveedores',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id_producto', models.AutoField(primary_key=True, serialize=False)),
                ('codigo', models.CharField(max_length=45, unique=True)),
                ('nombre', models.CharField(max_length=45)),
                ('unidad', models.CharField(blank=True, max_length=45, null=True)),
                ('cantidad_stock', models.CharField(max_length=45)),
                ('cantidad_inventario', models.CharField(blank=True, max_length=45, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True)),
                ('costo_compra', models.IntegerField(blank=True, null=True)),
                ('costo_venta', models.IntegerField(blank=True, null=True)),
                ('bodega', models.CharField(max_length=45)),
                ('descripcion', models.CharField(blank=True, max_length=200, null=True)),
                ('obsoleto', models.BooleanField(default=False)),
                ('id_usuario', models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, related_name='productos_usuario', to=settings.AUTH_USER_MODEL)),
                ('id_proveedor', models.ForeignKey(db_column='id_proveedor', on_delete=django.db.models.deletion.DO_NOTHING, related_name='productos_proveedor', to='pedidosApp.proveedores')),
            ],
            options={
                'db_table': 'productos',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Pedidos',
            fields=[
                ('id_pedido', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.IntegerField()),
                ('fecha_pedido', models.DateTimeField(auto_now_add=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True)),
                ('fecha_despacho', models.DateTimeField(blank=True, null=True)),
                ('resuelto', models.BooleanField(default=False)),
                ('id_usuario', models.ForeignKey(db_column='id', on_delete=django.db.models.deletion.DO_NOTHING, related_name='pedidos_usuario', to=settings.AUTH_USER_MODEL)),
                ('id_producto', models.ForeignKey(db_column='id_producto', on_delete=django.db.models.deletion.DO_NOTHING, related_name='pedidos_producto', to='pedidosApp.productos')),
                ('id_proveedor', models.ForeignKey(db_column='id_proveedor', on_delete=django.db.models.deletion.DO_NOTHING, related_name='pedidos_proveedor', to='pedidosApp.proveedores')),
            ],
            options={
                'db_table': 'pedidos',
                'managed': True,
            },
        ),
    ]