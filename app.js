const express = require("express");
const cors = require("cors");
require("dotenv").config();


// Cria o servidor
const app = express();

const PORT = process.env.PORT || 3000;


// Habilitar CORS - Permite requisições de outras origens 
app.use(cors());
// Receber JSON - Faz o parser de JSON no corpo das requisições
app.use(express.json())

// Db connnection
const conn = require("./db/conn")
conn()

// routes (rotas)
const routes = require("./routes/router")

// aplicar /API como rota 

app.use("/api", routes );

// Inicia o servidor e escuta em uma porta escolhida
app.listen(PORT, () => {
    console.log(`🚀 Servidoor Online na porta ${PORT}`)
});
