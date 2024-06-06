import { pool } from "../config/db.mysql.js";
import { tokenSign } from "../middlewares/middlewares.aerolinea.js";

export const crearAerolineas = async (req, res) => {

    let info = req.body;

    try {
        let resultado = await pool.query(`
        insert into reservass(
        id,
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
        estado
        ) values
            (
                ${info.id}, 
                '${info.nombre}',
                '${info.apellido}',
                '${info.fecha_nacimiento}',
                ${info.numero_telefono},
                '${info.nacionalidad}',
                '${info.pasaporte}',
                '${info.correo_electronico}',
                '${info.fecha_reserva}',
                '${info.origen}',
                '${info.destino}',
                '${info.estado}'
            )
        `)
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "aerolinea insertada"
            })
        } else {
            res.json({
                respuesta: "No inserto ningua aerolinea"
            })
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "post"
        })
    }
}
export const mostrarAerolineas = async(req, res) => {

    let id = req.params.id;

    try {
        const resultado = await pool.query(`select * from reservas where id = ${id}`);
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error": error,
            "method": "get"
        })
    }
}
export const actualizarAerolineas = async(req, res) => {

    let info = req.body;

    try {
        let resultado = await pool.query(`
        update reservass
        set
        id = ${info.id}.
        nombre = '${info.nombre}',
        apellido = '${info.apellido}',
        fecha_de_nacimiento = '${info.fecha_de_nacimiento}',
        numero_telefono = ${info.numero_telefono},
        nacionalidad = '${info.nacionalidad}',
        pasaporte = '${info.pasaporte}',
        correo_electronico = '${info.correo_electronico}'
        fecha_de_reserva = '${info.fecha_de_reserva}',
        origen = '${info.origen}',
        destino = '${info.destino}',
        estado = '${info.estado}'
        where id = ${info.id},
        `)
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta:"registro modificado"
            })
        } else {
            res.json({
                respuesta:"No modifico nada"
            })
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "put"
        })
    }
}
export const eliminarAerolineas = async(req, res) => {

    let info = req.body;

    try {
        let resultado = await pool.query(`
            delete from reservass
            where id = ${info.id}
        `)

        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Aerolinea borrada"
            })
        } else {
            res.json({
                respuesta: "No borro ninguna aerolinea"
            })
        }

    } catch (error) {
        res.json({
            "error":error,
            "method": "delete"
        })
    }
}
export const loginAerolineas = async (req, res) => {

    let nacionalidad = req.body.nacionalidad;
    let pasaporte = req.body.pasaporte;

    try {
        let resultado = await pool.query(`
        select nacionalidad from reservass
        where nacionalidad = '${nacionalidad}' and pasaporte = '${pasaporte}'
        `);

        if (resultado[0] == "") {
            res.json({
                respuesta: "Logueo incorrecto",
                estado: false
            });
        } else {
            let token = tokenSign({
                nacionalidad: nacionalidad,
                pasaporte: pasaporte
            });

            res.json({
                respuesta: "Logueo correcto",
                estado: true,
                token: token
            });
        }
    } catch (error) {
        res.json({
            respuesta:"Error en el logueo",
            type:error
        })
    }
}
export const listarAerolineas = async(req, res) => {

    try {

        const resultado = await pool.query("select * from reservass");
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error":error,
            "method": "get"
        })
    }

}