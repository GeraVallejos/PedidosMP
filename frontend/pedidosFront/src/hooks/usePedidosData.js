import { useState, useEffect } from 'react';
import api from '../helpers/interceptorJWT';

export const usePedidosData = (estado) => {
    const [pedido, setPedido] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [passwordError, setPasswordError] = useState(null);

    // Efecto para cargar los pedidos
    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const respuesta = await api.get("http://localhost:8000/api/v1/pedido/");
                // Filtramos según el estado requerido (resueltos o no resueltos)
                const dataFilter = respuesta.data.filter(res => res.resuelto === estado);
                setPedido(dataFilter);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos');
                setLoading(false);
                console.error("Error fetching pedidos:", error);
            }
        };

        fetchPedidos();
    }, [estado]);

    // Función para actualizar un pedido
    const updatePedido = async (id, updatedData) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.put(
                `http://localhost:8000/api/v1/pedido/${id}/`,
                updatedData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            
            if (response.status === 200) {
                setPedido(prev => prev.map(item => 
                    item.id_pedido === id ? { ...item, ...updatedData } : item
                ));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating pedido:", error);
            return false;
        }
    };

    // Función para eliminar un pedido (frontend y backend)
    const deletePedido = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.delete(
                `http://localhost:8000/api/v1/pedido/${id}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 204) {
                setPedido(prev => prev.filter(item => item.id_pedido !== id));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al borrar el pedido:", error);
            return false;
        }
    };

    // Función para verificar contraseña y eliminar
    
    const verifyPasswordAndDelete = async (id, password) => {
        try {
            // 1. Verificar contraseña con el endpoint de login
            const verificationResponse = await api.post(
                'http://localhost:8000/api/v1/usuario/verify_password/',
                { password },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
            );
    
            if (verificationResponse.data.valid) {
                const deleteResponse = await api.delete(
                    `http://localhost:8000/api/v1/pedido/${id}/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    }
                );
    
                if (deleteResponse.status === 204) {
                    setPedido(prev => prev.filter(item => item.id_pedido !== id));
                    setPasswordError(null);
                    return true;
                }
            }
            
            setPasswordError('Contraseña incorrecta');
            return false;
        } catch (error) {
            console.error("Error al verificar contraseña o eliminar:", error);
            setPasswordError(error.response?.data?.error || 'Error al verificar la contraseña');
            return false;
        }
    };

    return {
        pedido,
        error,
        loading,
        passwordError,
        updatePedido,
        deletePedido,
        setPedido,
        verifyPasswordAndDelete,
    };
};