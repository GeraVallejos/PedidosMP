class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Imprimir los encabezados de la solicitud para depuración
        print("Encabezados de la solicitud:")
        for header, value in request.headers.items():
            print(f"{header}: {value}")
        
        # Continuar con la respuesta normal
        response = self.get_response(request)
        return response