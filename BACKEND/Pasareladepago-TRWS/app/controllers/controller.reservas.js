import { pool } from "../../config/db_mysql.js";
import { tokenSing } from "../middlewares/middleware.reserva.js";

export const CrearReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        insert into ticketss (
            id,
            transporte,
            servicios,
            contacto,
            identificacion,
            fecha_de_reserva,
            descripcion,
            metodo_de_pago,
            pagar
        )values(${info.id},
            '${info.transporte}',
            '${info.servicios}',
            '${info.contacto}',
            '${info.identificacion}',
            '${info.fecha_de_reserva}',
            '${info.descripcion}',
            '${info.metodo_de_pago}',
            '${info.pagar}')
        `)
        if(resultado[0].affectedRows > 0){
            res.json({
                "respuesta":"Reserva creada correctamente"
            });
        }else{
            res.json({
                "respuesta": "Reserva creada incorrectamente"
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "post"
        });
    }
}

export const MostrarReserva = async(req, res) =>{
    let id = req.params.id;
    try {
        const resultado = await pool.query(`select * from tickets where id = ${id}`);
        // console.log(resultado[0]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            "error": error,
            "method": "get"
        });
    }
};

export const ActualizarReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        update ticketss
        set
        id = ${info.id},
        transporte = '${info.transporte}',
        servicios = '${info.servicios}',
        contacto = '${info.contacto}',
        identificacion = '${info.identificacion}',
        fecha_de_reserva = '${info.fecha_de_reserva}',
        descripcion = '${info.descripcion}',
        metodo_de_pago = '${info.metodo_de_pago}',
        pago = '${info.pago}'
        where  id = ${info.id}
        `);
        if(resultado[0].affectedRows > 0){
            res.json({
                "respuesta":"La reserva a sido actualizada correctamente",
            });
        }else{
            res.json({
                "respuesta": "La reserva no podido actualizarse",
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "put"
        });
    }
}

export const EliminarReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        delete from ticketss
        where id = ${info.id}
        `);

        if (resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "Reserva eliminada correctamente",
            });
        } else {
            res.json({
                "respuesta": "No se pudo Eliminar la reserva",
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        });
    }
}

export const VerificarReserva = async(req, res) => {
    let contacto = req.body.contacto;
    let identificacion = req.body.identificacion;
    try {
        let resultado = await pool.query(`
        select contacto from ticketss
        where contacto = '${contacto}' and identificacion = '${identificacion}'
        `);

        if(resultado[0]==""){
            res.json({
                respuesta:"Verificación incorrecta",
                estado: false
            });
        }else{
            let token = tokenSing({
                contacto:contacto,
                identificacion:identificacion
            });
            res.json({
                "respuesta": "Verificación correcta",
                "estado": true,
                token:token
            });
        }
    } catch (error) {
        res.json({
            respuesta: "Error al verificarse",
            type: error
        });
    }
}

export const ListarReservas = async(req, res) =>{

    try {
        const resultado = await pool.query("select * from ticketss");
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error": error,
            "method": get
        });
        
    };
};

