//Esta constante nos sirve para que el usuario se pueda logiar y entrar a nuestra aplicacion
// 

const logueese = () => {
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (!correo || !contrasena) {
        alertify.error("Por favor, ingrese su correo y contraseña.");
        return;
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    };

    const url = "http://localhost:20000/api/login";

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.estado) {
                // Guardar el token en localStorage o en una cookie
                document.cookie = `token=${data.token}; path=/`;
                // Redirigir al usuario al dashboard
                window.location.href = "/dash";
            } else {
                alertify.error(data.respuesta || "Clave incorrecta");
            }
        })
        .catch(error => {
            console.log("Error:", error.message);
            alertify.error("Error al intentar iniciar sesión");
        });
};
