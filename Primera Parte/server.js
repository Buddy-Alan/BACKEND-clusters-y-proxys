import express from "express";
import cluster from "cluster";
import os from "os";
import parseArgs from "minimist";

const cpus = os.cpus().length
const app = express();
const objtArg = parseArgs(process.argv.slice(2))
const port = objtArg.port && objtArg.port != true ? objtArg.port : 8080

const modo = objtArg.modo ? objtArg.modo.toUpperCase() : "FORK"

console.log(`Se va a iniciar la aplicacion en modo ${modo} en el puerto ${port}`)

if (cluster.isPrimary && modo == "CLUSTER") {
    for (let i = 0; i < cpus; i++) {
        cluster.fork()
    }
    cluster.on("exit", (worker, error) => {
        console.log(`El subproceso ${worker.process.pio} dejo de funcionar`)
        cluster.fork()
    })
} else {
    app.listen(port, () => console.log(`server en puerto ${port}, en proces ${process.pid}`))
}

app.get("/", (req, res) => {
    res.send(`Servidor funcionando en el puerto ${port}, en el proceso ${process.pid} en el modo ${modo}`)
})