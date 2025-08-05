// invocar o serviceModel do service 

const { Service: ServiceModel } = require("../models/Service");
const { get } = require("../routes/service");

// cria o obejto controller 

const serviceController = {

    // Metodo POST - vamos criar um metodo create que recebe de arguemento requisicao e reposta e dentro desse metodo vou adicionar um try catch. com um objeto com as propriedade que vem do service (name - description - price - image),

    create: async (req, res) => {
        try {

            // extraindo os dados da req
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            // Inserindo model no BD com a funcao create, essa que vai criar os registros dentro do BD.

            const response = await ServiceModel.create(service);

            // Resposta para chegar do BD - Onde eu passo o proprio response e um msg. 

            res.status(201).json({ response, msg: "📦 Servico criado com sucesso" })




        } catch (error) {
            console.log(error)
        }
    },

    // Resgatas os servicos - cria uma const services e da um await no model (serviceModel) entao aplicar o metodo find() (esse que pega todos os determinados dados de um collection)
    getAll: async (req, res) => {

        try {

            const services = await ServiceModel.find();


            // envia o service para o frontend(obj json)  
            res.json(services);

        } catch (error) {
            console.log(error)
        }
    },

    // resgatando dados de forma isolada, com id - 
    get: async (req, res) => {
        try {

            // Precimaos passar o id, porem nao conseguimos fazer isso dereto com o verbo get, entao temos que passar o id pela URL, usando a obj especial params.

            const id = req.params.id;

            // Precimos pegar esse id do bd, logo com a const service e o serviceModel vamos utilizar um metodo especial do mongoose para id (FindByID) passando o id como parametro do metodo. 
            const service = await ServiceModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "ALGO DE PODRE NO REINO DA DINAMARCA" });
                return;
            }

            res.json(service)

        } catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id;

            const service = await ServiceModel.findById(id);

            if (!service) {
                res.status(404).json({ msg: "ALGO DE PODRE NO REINO DA DINAMARCA" })
            }

            const deleteService = await ServiceModel.findByIdAndDelete(id);

            res.status(200).json({ deleteService, msg: "Sucesse and delete service" })

        } catch (error) {
            console.log(error)
        }
    },

    update: async (req, res) => {

                try {
          
        // Pega o id pelo params 
        const id = req.params.id;

        // pega os dados do servico 
        // (name - description - price - image),
        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        };


        // passa o id e o service 
        const updateService = await ServiceModel.findByIdAndUpdate(id, service);

        if (!updateService) {
            res.status(401).json({ msg: "Error server tente novamente" });
            return;
        }


        // pessa a msg de sucesso 
        res.status(200).json({ service, msg: "Servico atualizado" })


          } catch (error) {
            console.log(error)
        }
}

    } 





// Exportae objeto controller

module.exports = serviceController;