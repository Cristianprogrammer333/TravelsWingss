import { pool } from "../../config/db_mysql.js";
import { tokenSing } from "../middlewares/middleware.usuario.js";
import bcrypt from "bcrypt";

export const mostrarUsuario = async(req, res) =>{
    let id = req.params.id;
    try {
        const resultado = await pool.query(`select * from usuarios where idusuario = ${id}`);
        // console.log(resultado[0]);
        res.json(resultado[0]);
        
    } catch (error) {
        res.json({
            "error":error,
            "method":"get"
        });
        
    };
};


export const crearUsuario = async(req, res) =>{
    const { identificacion, nombre, correo, contrasena, telefono } = req.body;

    console.log(identificacion, nombre, correo, contrasena, telefono);
    
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Guardar el usuario con la contraseña encriptada y otros campos
        await pool.query(`
            INSERT INTO usuarios (identificacion, nombre, correo, contrasena, telefono)
            VALUES (?, ?, ?, ?, ?)
        `, [identificacion, nombre, correo, hashedPassword, telefono]);

        res.json({
            respuesta: "Usuario registrado correctamente",
            estado: true
        });
    } catch (error) {
        res.json({
            respuesta: "Error en el registro",
            type: error
        });
    }
}


export const actualizarUsuario = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        update usuarios
        set
        idusuario = ${info.idusuario},
        identificacion = ${info.identificacion},
        nombre = '${info.nombre}',
        correo = '${info.correo}',
        contrasena = '${info.contrasena}',
        telefono = ${info.telefono}
        where idusuario = ${info.idusuario}
        `);
        if(resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "El usuario a sido actualizado",
            });
        }else{
            res.json({
                "respuesta": "El usuario no se a actualizado",

            });
        }
        
    } catch (error) {
        res.json({
            "error": error,
            "method": "put"
        });
    };
};

export const eliminarUsuario = async (req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        delete from usuarios
        where idusuario = ${info.idusuario}
        `);

        if(resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "Usuario Eliminado correctamente",
            });
        }else{
            res.json({
                "respuesta": "Usuario no eliminado",
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        });
    };
};


// export const LoginUsuario = async(req, res) => {
//     let correo = req.body.correo;
//     let contrasena = req.body.contrasena;
//     try {
//         let resultado = await pool.query(`
//         select correo from usuarios
//         where correo = '${correo}' and contrasena = '${contrasena}'
//         `);

//         if(resultado[0]==""){
//             res.json({
//                 respuesta:"Logueo Incorrecto",
//                 estado: false
//             });
//         }else{
//             let token = tokenSing({
//                 correo:correo,
//                 contrasena:contrasena
//             });
//             res.json({
//                 "respuesta": "Logueo correcto",
//                 "estado": true,
//                 token:token
//             });
//         }
//     } catch (error) {
//         res.json({
//             respuesta: "Error en el logueo",
//             type: error
//         });
//     }
// }

export const LoginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Consulta para obtener la contraseña encriptada del usuario
        const [rows] = await pool.query(`
            SELECT contrasena FROM usuarios
            WHERE correo = ?
        `, [correo]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.json({
                respuesta: "Logueo Incorrecto",
                estado: false
            });
        }

        const hashedPassword = rows[0].contrasena;

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
        const isMatch = await bcrypt.compare(contrasena, hashedPassword);

        if (!isMatch) {
            return res.json({
                respuesta: "Logueo Incorrecto",
                estado: false
            });
        }

        // Generar el token
        const token = tokenSing({ correo });

        res.json({
            respuesta: "Logueo correcto",
            estado: true,
            token:token
        });
    } catch (error) {
        res.json({
            respuesta: "Error en el logueo",
            type: error.message
        });
    }
};


export const ListarUsuario = async(req, res) =>{

    try {
        const resultado = await pool.query("select * from usuarios");
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error": error,
            "method": get
        });
        
    };
};
