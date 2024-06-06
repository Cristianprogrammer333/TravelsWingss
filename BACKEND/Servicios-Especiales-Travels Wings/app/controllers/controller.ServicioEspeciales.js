import { pool } from "../config/db_mysql.js";
import { tokenSing } from "../middlewares/middleware.ServiciosEspeciales.js";


export const CrearServicioEspecial = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        insert into special_services (
            service_id,
            user_id,
            description,
            request_date
        )values(
            ${info.service_id}, ${info.user_id}, '${info.description}', '${info.request_date}'
        )
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "Registro insertado correctamente"
            });
        }else{
            res.json({
                "respuesta": "Error al insertar el registro"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            "method": "post"
        });
    }
};

export const MostrarServicioEspecial = async(req, res) =>{
    let id = req.params.id;
    try {
        const resultado = await pool.query(`select * from special_services where service_id = ${id}`);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            "method": "get"
        });
    }
};

export const ActualizarServiciosEspeciales = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        update special_services
        set
        service_id = ${info.service_id},
        user_id = ${info.user_id},
        description = '${info.description}',
        request_date = '${info.request_date}'
        where service_id = ${info.service_id}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "Registro modificado correctamente"
            });
        }else{
            res.json({
                "respuesta": "Error al modificar el registro"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            "method": "put"
        });
    }
};


export const EliminarServiciosEspeciales = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await  pool.query(`
        delete from special_services
        where service_id = ${info.service_id}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "El registro se a eliminado correctamente"
            });
        }else{
            res.json({
                "respuesta": "Error al eliminar el resgistro"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            "method": "delete"
        });
    }
};

export const VerificarServicio = async(req, res) =>{
    let service_id = req.body.service_id;
    let user_id = req.body.user_id;

    try {
        const resultado = await pool.query(`
        select service_id from special_services
        where service_id = ${service_id} and user_id = ${user_id}
        `);
        if (resultado[0].affectedRows >0) {
            res.json({
                respuesta: "Error al verificar el servicio",
                estado: false
            });
        }else{
            let token = tokenSing({
                service_id:service_id,
                user_id: user_id
            });
            res.json({
                respuesta: "Servicio verificado correctamente",
                estado: true,
                token:token
            });
        }
    } catch (error) {
        res.json({
            respuesta: "Error al verificar los datos",
            type: error
        });
    }
};

export const VerificarServiciosEspeciales = async(req, res) =>{
    try {
        const resultado = await pool.query("select * from special_services");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error:error,
            "method": "get"
        });
    }
};