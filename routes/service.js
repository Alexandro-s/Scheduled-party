// invoca o Router do express

const router = require("express").Router();

// invoca o ServiceController 
const serviceController = require("../controllers/serviceController");


// Criar endPointer 

router
  .route("/services") // - Defindo a rota para a requisicao de POST 
  .post((req, res) => serviceController.create(req, res)); // 	Define que essa rota responde a requisições POST - Deficindo a funcao que sera chamdada quando a rota for acionada 

  // router. router pra acessar a rota que eu quero, essa (/services) com um metodo de get com um requisicao e respostas, onde acessamos o serviceController e o metodo getAll do ServiceController, passando req e res como argumento. 

  router.route("/services").get((req, res) => serviceController.getAll(req, res));


  // router. router pra acessar a rota que eu quero, essa (/services/:id) com o verbo de get com um requisicao e respostas, onde acessamos o serviceController e o metodo get do ServiceController, passando req e res como argumento. 
  router.route("/services/:id").get((req, res) => serviceController.get(req, res));

    // router. router pra acessar a rota que eu quero, essa (/services/:id) com o verbo delete com um requisicao e respostas, onde acessamos o serviceController e o metodo delete do ServiceController, passando req e res como argumento. 

  router.route("/services/:id").delete((req, res) => serviceController.delete(req, res));

  router.route("/services/:id").put((req,res) => serviceController.update(req, res));




// exporta o router 
module.exports = router;