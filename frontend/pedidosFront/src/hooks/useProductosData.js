import { useState, useEffect } from 'react';
import api from '../helpers/interceptorJWT';

export const useProductosData = () => {
    const [producto, setProducto] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efecto para cargar los productos
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const respuesta = await api.get("http://localhost:8000/api/v1/producto/");
                const data = respuesta.data
                setProducto(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos');
                setLoading(false);
                console.error("Error al cargar pedidos:", error);
            }
        };

        fetchProducto();
    },[]);

    // Función para actualizar un producto
    const updateProducto = async (id, updatedData) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.put(
                `http://localhost:8000/api/v1/producto/${id}/`,
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            
            if (response.status === 200) {
                setProducto(prev => prev.map(item => 
                    item.id_producto === id ? { ...item, ...updatedData } : item
                ));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error actualizando producto:", error);
            return false;
        }
    };

    // Función para eliminar un pedido (frontend y backend)
    const deleteProducto = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.delete(
                `http://localhost:8000/api/v1/producto/${id}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 204) {
                setProducto(prev => prev.filter(item => item.id_producto !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al borrar el producto:", error);
            return false;
        }
    };

    return {
        producto,
        error,
        loading,
        updateProducto,
        deleteProducto,
        setProducto
    };
};