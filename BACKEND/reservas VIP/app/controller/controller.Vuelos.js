import { pool } from "../config/db_mysql.js";
import { TokenSing } from "../middlewares/middlewares.js";
import bodyParser from "body-parser";

export const CrearVuelo = async(req, res) => {
  let info = req.body;
    try {
        let resultado = await pool.query(`
            INSERT INTO viajeros (
                id,
                clase,
                pais,
                aerolinea,
                comidafavorita
            ) VALUES (?, ?, ?, ?, ?)
        `, [
            info.id,
            info.clase, 
            info.pais, 
            info.aerolinea, 
            info.comidafavorita
        ]);

        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "El registro ha sido insertado correctamente",
            });
        } else {
            res.json({
                respuesta: "El registro no ha sido insertado correctamente",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
            method: "post",
        });
    }
};

export const MostrarVuelo = async (req, res) => {
  let id = req.params.id;
  try {
    let resultado = await pool.query(
      `select * from viajeros  where  id = ${id}`
    );
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      error: error,
      method: "get",
    });
  }
};

export const ActualizarVuelo = async (req, res) => {
  let info = req.body;

  try {
    let resultado = await pool.query(`
        update viajeros
        set
        id = ${info.id},
        clase = '${info.clase}',
        pais = ${info.pais},
        aerolinea = '${info.aerolinea}'
        where id = ${info.id}
        `);
    if (resultado[0].affectedRows > 0) {
      res.json({
        respuesta: "Registro Modificado",
      });
    } else {
      res.json({
        respuesta: "Registro no modificado, hay un error",
      });
    }
  } catch (error) {
    res.json({
      error: error,
      method: "put",
    });
  }
}

export const EliminarVuelo = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        delete from viajeros
        where id = ${info.id}
        `);

        if(resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Registro Eliminado correctamente"
            })
        }else{
            res.json({
                respuesta:"Hubo un error al elimar el registro"
            })
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        })
    }
}

export const VueloConfig = async(req, res) =>{
  let clase = req.body.clase;
  let pais = req.body.pais;

  try {
    let resultado = await pool.query(`
    select clase from viajeros
    where clase = '${clase}' and pais = '${pais}'
    `);
    if(resultado[0]==""){
      res.json({
        Respuesta: "Los Datos ingresados son incorrectos",
        estado: false
      });
    }else{
      let token = TokenSing({
        Origen:Origen,
        Destino:Destino
      })
      res.json({
        respuesta: "Los datos ingresados son correctos",
        estado: true,
        token:token
      });
    }
  } catch (error) {
    res.json({
      respuesta: "Error al ingresar los datos",
      type:error
    });
  }
}

export const ListarVuelos = async(req, res) =>{
  try {
    const resultado = await pool.query("select * from viajeros");
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      "error": error,
      "method": "get"
    });
  }
}