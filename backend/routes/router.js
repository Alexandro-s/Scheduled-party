// invocar router 
const router = require("express").Router()

// invocar serviceRouter 

const serviceRouter = require("./service")

// middware  para marca "/" como caminho do service\Router 
router.use("/", serviceRouter);



// Invocar  partyController 
const partyRouter = require("./parties");

router.use("/", partyRouter);


// Exporta o router 
module.exports = router;
