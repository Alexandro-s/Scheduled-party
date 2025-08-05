const mongoose = require("mongoose")

async function main () {
    try {

         mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.DB_URI);
         console.log("📦 Conectado ao MongoDB");
    } catch (error) {
           console.log(`Erro: ${error}`);
    }
}

module.exports  = main;