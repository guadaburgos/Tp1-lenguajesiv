function obtenerUbicacion() {

    const estadoUbicacion =
        document.getElementById("estadoUbicacion");

    // Verificamos que el navegador soporte geolocalización
    if (!navigator.geolocation) {

        estadoUbicacion.textContent =
            "La geolocalización no está disponible en este navegador.";

        return;
    }

    const configuracion = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        mostrarUbicacion,
        mostrarError,
        configuracion
    );
}


function mostrarUbicacion(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    const exactitud = posicion.coords.accuracy;

    document.getElementById("latitud").textContent =
        latitud;

    document.getElementById("longitud").textContent =
        longitud;

    document.getElementById("exactitud").textContent =
        exactitud + " metros";

    document.getElementById("estadoUbicacion").textContent =
        "Ubicación obtenida correctamente.";
}


function mostrarError(error) {

    const estadoUbicacion =
        document.getElementById("estadoUbicacion");

    switch (error.code) {

        case 1:
            estadoUbicacion.textContent =
                "Permiso de ubicación denegado.";
            break;

        case 2:
            estadoUbicacion.textContent =
                "La ubicación no está disponible.";
            break;

        case 3:
            estadoUbicacion.textContent =
                "Se agotó el tiempo para obtener la ubicación.";
            break;

        default:
            estadoUbicacion.textContent =
                "Ocurrió un error al obtener la ubicación.";
    }
}

const inputArchivo =
    document.getElementById("archivo");

const imagen =
    document.getElementById("imagen");

const mensajeArchivo =
    document.getElementById("mensajeArchivo");


inputArchivo.addEventListener("change", function () {

    const archivo = inputArchivo.files[0];

   
    if (!archivo) {

        mensajeArchivo.textContent =
            "No se seleccionó ningún archivo.";

        imagen.removeAttribute("src");

        return;
    }


    
    if (!archivo.type.startsWith("image/")) {

        mensajeArchivo.textContent =
            "Error: solamente se pueden cargar imágenes.";

        imagen.removeAttribute("src");

        inputArchivo.value = "";

        return;
    }


    
    const lector = new FileReader();


    
    lector.addEventListener("load", function () {

        imagen.src = lector.result;

        mensajeArchivo.textContent =
            "Imagen cargada correctamente.";

    });


    
    lector.readAsDataURL(archivo);

});




obtenerUbicacion();