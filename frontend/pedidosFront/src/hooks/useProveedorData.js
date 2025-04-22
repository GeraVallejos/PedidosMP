import { useState, useEffect } from 'react';
import api from '../helpers/interceptorJWT';

export const useProveedorData = () => {
    const [proveedor, setProveedor] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efecto para cargar los proveedor
    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const respuesta = await api.get("http://localhost:8000/api/v1/proveedor/");
                const data = respuesta.data
                setProveedor(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos');
                setLoading(false);
                console.error("Error al cargar proveedores:", error);
            }
        };

        fetchProveedor();
    },[]);

    // Función para actualizar un proveedor
    const updateProveedor = async (id, updatedData) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.put(
                `http://localhost:8000/api/v1/proveedor/${id}/`,
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            
            if (response.status === 200) {
                setProveedor(prev => prev.map(item => 
                    item.id_proveedor === id ? { ...item, ...updatedData } : item
                ));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error actualizando proveedor:", error);
            return false;
        }
    };

    // Función para eliminar un proveedor (frontend y backend)
    const deleteProveedor = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.delete(
                `http://localhost:8000/api/v1/proveedor/${id}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 204) {
                setProveedor(prev => prev.filter(item => item.id_proveedor !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al borrar el proveedor:", error);
            return false;
        }
    };

    return {
        proveedor,
        error,
        loading,
        updateProveedor,
        deleteProveedor,
        setProveedor
    };
};