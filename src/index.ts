import { runServer } from "./app"
import 'reflect-metadata'
import datasource from "./condig/typeorm";
import { error } from "console";

async function main (){
    datasource
         .initialize()
         .then(()=> console.log('conectado a bd'))
         .catch((error)=>{console.error('error de conexion a la bd ',error)})
    const app= await runServer();
    app.listen(3000)
    console.log('server up port 3000')
}

main();