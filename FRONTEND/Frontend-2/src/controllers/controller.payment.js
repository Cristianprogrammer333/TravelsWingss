import { application } from "express";
//Importa las constantes 'HOST' y 'PAYPAL_API' desde el modulo ./config/config.js
import { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config/config.js";
//importar la libreria axios
import axios from "axios";

//Exportar una funcion controlada llamada 'CreateOrder' que toma solicitudes (req) y respuesta (res)
export const CreateOrder = async (req, res) => {//Inicio Funcion
    //crear un objeto 'order' que representa una orden de compra con varios detalles
    const order = {//Inicio objeto
        intent:"CAPTURE",
        purchase_units : [
            {
                amount: {
                    currency_code: "USD", //Codigo de moneda en dolares estadounidenses
                    value: "100.00" //Valor del monto de la orden, es este caso $100.00
                }
            },
        ],
        application_context: {
            brand_name: "Travels Wings", // Nombre del servicio
            landing_page: "NO_PREFERENCE", // Pagina de destino preferida
            user_action: "PAY_NOW", // Accion del usuario para pagar ahora
            return_url: `${HOST}/capture-order`, //url de retorno despues de la captura de la orden
            cancel_url: `${HOST}/cancel-order`, //url de cancelacion de pago
        }
    }//FinalObjeto

    // crea un objeto params de tipo URLSearchParams  para contener los parametros de la consulta para la autentificacion de paypal.
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    //Realiza una solicitud POST para obtener un token de acceso de paypal.
    const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params,{
        auth: {
            username: PAYPAL_API_CLIENT, //Nombre de usuario para la autentificacion
            password: PAYPAL_API_SECRET  //contraseña para autentificacion
        }
    });
    
    //Sirve para mostrar los datos en la consola
    // console.log(data);

    //Utiliza axios para realizar una solicitud POST a la url  ${PAYPAL_API}/v2/checkout/orders
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
            Authorization : `Bearer ${access_token}` //Agrega el token de acceso en los encabezados de autorizacion
        }
    });

    // //Imprime en la consola la respuesta de la solicitud
    // console.log(response.data);

    // Devuelve una respuesta json al cliente con los datos de la respuesta
    return res.json(response.data);

}; //Final Funcion

//Exportar una funcion controlada llamada 'CaptureOrder' que toma solicitudes (req) y respuesta (res)
export const CaptureOrder = async(req, res) => {//inicio funcion

    const {token} = req.query;

    //Realiza una solicitud POST a la API de paypal para capturar una orden utilizando el token proporcionado.
    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {}, {
            auth : {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        }
    );
    //imprime en la consola  los datos de la respuesta de paypal
    console.log(response.data);
    //Envia una respuesta al cliente  indicando que el pago ha sido realizado (esto puede necesitar ajustarse segun la logica de tu aplicacion).
    return res.send('Payed');

};  //Final funcion



//Exportar una funcion controlada llamada 'CancelOrder' que toma solicitudes (req) y respuesta (res)
export const CancelOrder = (req, res) => res.redirect('/');