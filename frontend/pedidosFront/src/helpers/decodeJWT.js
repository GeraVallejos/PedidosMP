// Funcion para obtener el id_usuario. No sirve con el serializer

const decodeJWT = (token) => {
    if (!token) {
        console.error("Token no proporcionado.");
        return null;
    }

    try {
        // Divide el token en sus tres partes
        const payloadBase64 = token.split('.')[1];
        // Decodifica la parte del payload
        const decodedPayload = JSON.parse(atob(payloadBase64));
        // Verifica si contiene el id_usuario
        const id_usuario = decodedPayload.id_usuario || decodedPayload.user_id; 
        

        return id_usuario;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}

export default decodeJWT;