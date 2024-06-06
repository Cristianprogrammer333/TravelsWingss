import { pool } from "../config/db_mysql.js";
import bcrypt from "bcrypt";
// import { tokenSing } from "../middlewares/middleware.usuario.js";

export const crearUsuario = async(req, res)=>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        insert into quejas (
            id,
            Nombre,
            Correo,
            Mensaje
        )values(
            ${info.id}, '${info.Nombre}', '${info.Correo}', '${info.Mensaje}'
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

}
export const mostrarUsuario = async(req, res)=>{

    let id = req.params.id;

    try {

        const resultado = await pool.query(`select * from quejas`);
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error":error,
            "method": "get"
        })
    }

}
export const actulizarUsuario = async(req, res)=>{

    let info = req.body;

    try {
        let resultado = await pool.query(`
            update quejas
            set
            id = '${info.id}',
            Nombre = '${info.Nombre}',
            Correo = '${info.Correo}',
            Mensaje = '${info.Mensaje}'
            where id = ${info.id}
        `)

        if (resultado[0].affectedRows > 0 ){
            res.json({
                respuesta:"registro modificado"
            })
        }else{
            res.json({
                respuesta:"No modifico nada"
            })
        }
        
    } catch (error) {
        res.json({
            "error":error,
            "method": "put"
        })
    }

}
export const eliminarUsuario = async(req, res)=>{

    let info = req.body;

    try {
        let resultado = await pool.query(`
            delete from quejas
            where id = ${info.id}
        `)

        if (resultado[0].affectedRows > 0 ){
            res.json({
                respuesta:"registro borrado"
            })
        }else{
            res.json({
                respuesta:"No borro nada"
            })
        }
        
    } catch (error) {
        res.json({
            "error":error,
            "method": "delete"
        })
    }

}


