export const privateLoader = async () => {
    const isAuthenticated = localStorage.getItem("accessToken");

    if (!isAuthenticated) {
        // Redirige al login si no está autenticado
        throw new Response("Unauthorized", { status: 302, headers: { Location: "/login" } });
    }

    return null; // Permite continuar si está autenticado
};

export const publicLoader = async () => {
    const isAuthenticated = localStorage.getItem("accessToken");

    if (isAuthenticated) {
        // Redirige a /productos si ya está autenticado
        throw new Response("Already Authenticated", { status: 302, headers: { Location: "/productos" } });
    }

    return null; // Permite continuar si no está autenticado
};