//Esta funcion sirve para eliminar los registros de la aplicacion a la base de datos
const EliminaRegistro = async (event) => {
  try {
    // Mostrar un cuadro de diálogo de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      // Suponiendo que borrar es una función asíncrona
      const deleteSuccess = await borrar(event);
      
      // Si la eliminación fue exitosa, mostrar mensaje de éxito
      if (deleteSuccess) {
        await Swal.fire({
          title: "¡Eliminado!",
          text: "El registro ha sido borrado",
          icon: "success",
        });

        // Redirigir a la página de usuario
        window.location.href = "/usuario";
      } else {
        console.log("La eliminación no fue exitosa.");
      }
    }
  } catch (error) {
    console.error("Error al eliminar el registro", error);
  }
};

// Para salir de la aplicacion

const salirUsuario = () => {
  document.cookie = "token=";
  window.location.href = "/salir";
};

// esta contante sirve para guardar los usuarios que se han ingresado
const GuardarUsuario = () => {
  const identificacion = document.getElementById("identificacion").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const telefono = document.getElementById("telefono").value;

  const url = "http://localhost:20000/api/usuario";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idusuario: null,
      identificacion,
      nombre,
      correo,
      contrasena,
      telefono
    })
  };

  fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      alertify.success(data.respuesta);
    })
    .catch((error) => {
      console.error('Error:', error);
      alertify.error('Error al guardar el usuario: ' + error.message);
    });
};

// esta funcion sirve para guardar las reservas de los usuarios
const GuardarReserva = () => {
  // Obtener los valores seleccionados de los menús desplegables
  const clase = document.getElementById("clase").value;
  const pais = document.getElementById("pais").value;
  const aerolinea = document.getElementById("aerolinea").value;
  const comidafavorita = document.getElementById("comidafavorita").value;

  // Obtener los servicios seleccionados por el usuario
  const serviciosSeleccionados = Array.from(document.querySelectorAll(".servicio:checked")).map(input => input.value);

  const url = "http://localhost:13000/api/vuelo";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      clase,
      pais,
      aerolinea,
      comidafavorita,
      servicios: serviciosSeleccionados
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Reserva solicitada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar la reserva",
      });
    });
};


const RegistrarReservacion = () => {
  // Obtener los valores seleccionados de los menús desplegables y campos de texto
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
  const numero_telefono = document.getElementById("numero_telefono").value;
  const nacionalidad = document.getElementById("nacionalidad").value;
  const pasaporte = document.getElementById("pasaporte").value;
  const correo_electronico = document.getElementById("correo_electronico").value;
  const fecha_reserva = document.getElementById("fecha_reserva").value;
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const estado = document.getElementById("estado").value;

  const url = "http://localhost:12222/api/aerolinea";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      id: null,
      nombre,
      apellido,
      fecha_nacimiento,
      numero_telefono,
      nacionalidad,
      pasaporte,
      correo_electronico,
      fecha_reserva,
      origen,
      destino,
      estado,
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Reserva solicitada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar la reserva",
      });
    });
};

const GuardarPeticion = () => {
  // Obtener los valores de los campos del formulario
  const Nombre = document.getElementById("Nombre").value;
  const Correo = document.getElementById("Correo").value;
  const Mensaje = document.getElementById("Mensaje").value;

  const url = "http://localhost:7777/api/usuario";
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      id: null,
      Nombre,
      Correo,
      Mensaje
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Petición enviada con éxito",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al enviar la petición",
      });
    });
};



const CargarUsuario = (event) => {
  // console.log(event.target.parentElement.parentElement.children[1].innerHTML);
  // document.getElementById('idusuario').value = event.target.parentElement
  // .parentElement.children[1].innerHTML;
  document.getElementById("idusuario").value =
    event.target.parentElement.parentElement.children[0].innerHTML;
  document.getElementById("identificacion").value =
    event.target.parentElement.parentElement.children[1].innerHTML;
  document.getElementById("nombres").value =
    event.target.parentElement.parentElement.children[2].innerHTML;
  document.getElementById("correo").value =
    event.target.parentElement.parentElement.children[3].innerHTML;
  document.getElementById("contrasena").value =
    event.target.parentElement.parentElement.children[4].innerHTML;
  document.getElementById("telefono").value =
    event.target.parentElement.parentElement.children[5].innerHTML;
};

const ModificarUsuario = () => {
  const idusuario = document.getElementById("idusuario").value;
  const identificacion = document.getElementById("identificacion").value;
  const nombre = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const telefono = document.getElementById("telefono").value;

  const url = "http://localhost:20000/api/usuario";
  // const option = {
  //     method : "POST",
  //     body:  JSON.stringify({
  //         "idusuario": codigo
  //     })
  // }

  // alert('Registro guardado');

  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "PUT",
    body: JSON.stringify({
      idusuario: idusuario,
      identificacion,
      nombre,
      correo,
      contrasena,
      telefono,
    }),
    headers,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Registro modificado" + data);
    })
    .catch((error) => {
      alert("Error al modificar el registro", error);
    });
};

// esta contante nos ayuda a eliminar los usuarios si el token sigue activo
const borrar = async (event) => {
  let codigo = event.target.parentElement.parentElement.children[0].innerHTML;
  //
  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  //
  let retorno = false;
  const url = "http://localhost:20000/api/usuario";
  const option = {
    method: "DELETE",
    body: JSON.stringify({
      idusuario: codigo,
    }),
    headers,
  };
  await fetch(url, option)
    .then((res) => res.json())
    .then((data) => {
      if (data.respuesta) {
        retorno = true;
      }
    })
    .catch((error) => alert(error));

  console.log(retorno);
  return retorno;
};

//Esta constante nos sirve para crear los vuelos con las reservas de los usuarios

const RegistrarPagos = () => {
  const transporte = document.getElementById("transporte")?.value;
  const servicios = document.getElementById("servicios")?.value;
  const contacto = document.getElementById("contacto")?.value;
  const identificacion = document.getElementById("identificacion")?.value;
  const fecha_de_reserva = document.getElementById("fecha_de_reserva")?.value;
  const descripcion = document.getElementById("descripcion")?.value;
  const metodo_de_pago = document.getElementById("metodo_de_pago")?.value;
  const pagar = document.getElementById("pagar")?.value;

  // // if (!transporte || !servicios || !contacto || !identificacion || !fecha_de_reserva || !descripcion || !metodo_de_pago  || !pagar) {
  // //     console.error('One or more required fields are missing');
  // //     return;
  // }

  const url = "http://localhost:9999/api/reserva";

  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
      const cookies = cookieToken.split(";");
      cookies.forEach((cookie) => {
          const [nombre, valor] = cookie.split("=");
          if (nombre.trim() === "token") {
              token = valor;
          }
      });
  } else {
      alert("Debe loguearse nuevamente");
      return;
  }
  if (token == "") {
      alert("Debe loguearse nuevamente");
      return;
  }

  const headers = {
      "x-access-token": token,
      "Content-type": "application/json",
  };

  const options = {
      method: "POST",
      body: JSON.stringify({
          id: null,
          transporte,
          servicios,
          contacto,
          identificacion,
          fecha_de_reserva,
          descripcion,
          metodo_de_pago,
          pagar,
      }),
      headers,
  };

  fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
              },
          });
          Toast.fire({
              icon: "success",
              title: "Reserva realizada con éxito",
          });
      })
      .catch((error) => {
          console.error('Error:', error);
          const Toast = Swal.mixin({
              toast: false,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
              },
          });
          Toast.fire({
              icon: "warning",
              title: "Error al solicitar la reserva",
          });
      });
};



const RegistrarServiciosEspeciales = () => {
  const user_id = document.getElementById("user_id").value;
  const description = document.getElementById("description").value;
  const request_date = document.getElementById("request_date").value;

  const url = "http://localhost:8888/api/servicio";

  let token = "";
  const cookieToken = document.cookie;

  if (cookieToken) {
    const cookies = cookieToken.split(";");
    cookies.forEach((cookie) => {
      const [nombre, valor] = cookie.split("=");
      if (nombre.trim() === "token") {
        token = valor;
      }
    });
  } else {
    alert("Debe loguearse nuevamente");
    return;
  }
  if (token == "") {
    alert("Debe loguearse nuevamente");
    return;
  }

  const headers = {
    "x-access-token": token,
    "Content-type": "application/json",
  };

  const options = {
    method: "POST",
    body: JSON.stringify({
      service_id: null,
      user_id,
      description,
      request_date,
    }),
    headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Servicio solicitado con exito ",
      });
    })
    .catch((error) => {
      const Toast = Swal.mixin({
        toast: false,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Error al solicitar el servicio",
      });
  });
};

//Funcion para crear un reporte

const Reporte = (event) =>{
 const idusuario = event.target.parentElement.parentElement.children[0].innerHTML;
 const identificacion = event.target.parentElement.parentElement.children[1].innerHTML;
 const nombre =event.target.parentElement.parentElement.children[2].innerHTML;
 const correo = event.target.parentElement.parentElement.children[4].innerHTML;
 const telefono = event.target.parentElement.parentElement.children[3].innerHTML;
 const contrasena = event.target.parentElement.parentElement.children[5].innerHTML;

 const url = `/reporte?
 identificacion=${identificacion}&
 nombre=${nombre}&
 correo=${correo}&
 telefono=${telefono}`;
 window.open(url);
};

// esta constante nos sirve para que el usuario ingrese su aerolinea favorita o el administrador

// const GuardarAerolinea = () =>{
//   const Nombre = document.getElementById("Nombre").value;
//   const Codigo = document.getElementById("Codigo").value;
//   const PaisOrigen = document.getElementById("PaisOrigen").value;

//   const url = "http://localhost:12222/api/aerolinea";
//   let token = "";
//   const cookieToken = document.cookie;

//   if (cookieToken) {
//     const cookies = cookieToken.split(";");
//     cookies.forEach((cookie) => {
//       const [nombre, valor] = cookie.split("=");
//       if (nombre.trim() === "token") {
//         token = valor;
//       }
//     });
//   } else {
//     alert("Debe loguearse nuevamente");
//     return;
//   }
//   if (token == "") {
//     alert("Debe loguearse nuevamente");
//     return;
//   }

//   const headers = {
//     "x-access-token": token,
//     "Content-type": "application/json",
//   };

//   const options = {
//     method: "POST",
//     body: JSON.stringify({
//       ID_Aerolinea: null,
//       Nombre,
//       Codigo,
//       PaisOrigen,
//     }),
//     headers,
//   };
//   fetch(url, options)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const Toast = Swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "success",
//         title: "Servicio solicitado con exito",
//       });
//     })
//     .catch((error) => {
//       const Toast = Swal.mixin({
//         toast: false,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = Swal.stopTimer;
//           toast.onmouseleave = Swal.resumeTimer;
//         },
//       });
//       Toast.fire({
//         icon: "warning",
//         title: "Error al solicitar el servicio",
//       });
//   });
// };

// Base de datos de destinos
const destinos = [
  {
      aerolinea: "American Airlines",
      destino: "Nueva York, EE. UU.",
      precio: "$500",
      horaSalida: "09:00",
      horaLlegada: "14:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Lufthansa",
      destino: "París, Francia",
      precio: "$600",
      horaSalida: "12:00",
      horaLlegada: "17:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "Emirates",
      destino: "Dubái, Emiratos Árabes Unidos",
      precio: "$800",
      horaSalida: "15:00",
      horaLlegada: "23:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Qantas",
      destino: "Sídney, Australia",
      precio: "$900",
      horaSalida: "18:00",
      horaLlegada: "07:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "British Airways",
      destino: "Londres, Reino Unido",
      precio: "$700",
      horaSalida: "10:00",
      horaLlegada: "15:00",
      vip: true,
      disponibilidad: false
  },
  {
      aerolinea: "Singapore Airlines",
      destino: "Singapur, Singapur",
      precio: "$1000",
      horaSalida: "08:00",
      horaLlegada: "16:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Delta Air Lines",
      destino: "Tokio, Japón",
      precio: "$950",
      horaSalida: "14:00",
      horaLlegada: "22:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "Air France",
      destino: "Roma, Italia",
      precio: "$750",
      horaSalida: "11:00",
      horaLlegada: "16:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Cathay Pacific",
      destino: "Hong Kong, China",
      precio: "$850",
      horaSalida: "16:00",
      horaLlegada: "00:00",
      vip: true,
      disponibilidad: false
  },
  {
      aerolinea: "KLM",
      destino: "Ámsterdam, Países Bajos",
      precio: "$700",
      horaSalida: "13:00",
      horaLlegada: "18:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "Qatar Airways",
      destino: "Doha, Catar",
      precio: "$850",
      horaSalida: "20:00",
      horaLlegada: "02:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Turkish Airlines",
      destino: "Estambul, Turquía",
      precio: "$800",
      horaSalida: "14:00",
      horaLlegada: "20:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "Air Canada",
      destino: "Toronto, Canadá",
      precio: "$550",
      horaSalida: "08:00",
      horaLlegada: "13:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "Avianca",
      destino: "Bogotá, Colombia",
      precio: "$400",
      horaSalida: "10:00",
      horaLlegada: "14:00",
      vip: true,
      disponibilidad: true
  },
  {
      aerolinea: "Copa Airlines",
      destino: "Panamá, Ciudad de Panamá",
      precio: "$450",
      horaSalida: "09:00",
      horaLlegada: "12:00",
      vip: false,
      disponibilidad: true
  },
  {
      aerolinea: "LATAM Airlines",
      destino: "Santiago, Chile",
      precio: "$600",
      horaSalida: "11:00",
      horaLlegada: "17:00",
      vip: true,
      disponibilidad: true
  }
];

// Función para mostrar los destinos en el contenedor
function mostrarDestinos() {
    const container = document.getElementById('destinationsContainer');
    container.innerHTML = ''; // Limpiar contenido previo

    destinos.forEach((destino, index) => {
        const destinationDiv = document.createElement('div');
        destinationDiv.className = 'destination';
        destinationDiv.style.animationDelay = `${index * 0.1}s`; // Añadir retraso de animación

        destinationDiv.innerHTML = `
            <img src="https://source.unsplash.com/300x200/?airplane,${destino.destino}" alt="Imagen del destino">
            <h3>${destino.destino}</h3>
            <p><strong>Aerolínea:</strong> ${destino.aerolinea}</p>
            <p><strong>Precio:</strong> ${destino.precio}</p>
            <p><strong>Hora de salida:</strong> ${destino.horaSalida}</p>
            <p><strong>Hora de llegada:</strong> ${destino.horaLlegada}</p>
            <p><strong>VIP:</strong> ${destino.vip ? 'Sí' : 'No'}</p>
            <p class="${destino.disponibilidad ? 'availability' : 'unavailability'}">${destino.disponibilidad ? 'Disponible' : 'No disponible'}</p>
            <button class="btn-reservar">Reservar</button>
        `;

        container.appendChild(destinationDiv);
    });
    // Obtener el modal y el botón para cerrarlo
    const modal = document.getElementById("myModal");
    const closeButton = document.querySelector(".close");
    
    // Mostrar el modal cuando se haga clic en el botón de reservar
    const botonesReservar = document.querySelectorAll('.btn-reservar');
    botonesReservar.forEach((boton) => {
        boton.addEventListener('click', () => {
            modal.style.display = "block";
        });
    });
    
    // Ocultar el modal cuando se haga clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });
    
    // Ocultar el modal cuando se haga clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}



// Mostrar los destinos cuando la página se cargue
document.addEventListener('DOMContentLoaded', mostrarDestinos);

// document.getElementById('redirectButton').addEventListener('click', function(){
//   window.location.href = "http://localhost:3333";
// });











