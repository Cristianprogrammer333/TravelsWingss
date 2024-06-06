import app from "./src/server";
import colors from "colors";

app.listen(app.get("port"), () =>{
    console.log(`Conectado al puerto ${app.get('port').red}`);
});