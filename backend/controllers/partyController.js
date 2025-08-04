const Party = require("../models/Party");
const PartyModel = require("../models/Party");
const { update } = require("./serviceController");

// Função auxiliar para validar o orçamento da festa
const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);
    console.log(priceSum, budget);

    return priceSum <= budget;
};

const partyController = {

    // Cria uma nova festa
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                guests: req.body.guests,
                location: req.body.location,
                eventDate: req.body.eventDate,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            };

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                return res.status(406).json({ msg: "O seu orçamento é insuficiente." });
            }

            const response = await PartyModel.create(party);

            return res.status(201).json({ response, msg: "Festa criada com sucesso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Ocorreu um erro interno no servidor." });


        }
    },

    // Retorna todas as festas
    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();
            return res.json(parties);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },

    // Retorna uma festa pelo ID
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await PartyModel.findById(id);

            if (!party) {
                return res.status(404).json({ msg: "Festa não encontrada." });
            }

           res.json(party);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro interno do servidor." });
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const party = await PartyModel.findById(id);

            if(!party){
               res.status(404).json({msg: "Festa nao encontrada"});
                return 
            };

            const partyDelete = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({partyDelete, msg: "Party excluida"});

        }catch (error) {
            console.log(error);
            res.status(500).json({msg: "Error interno do Servidor"})
        }
    },

    update: async (req, res) => {
        try {

            const id = req.params.id;

           const  party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                guests: req.body.guests,
                location: req.body.location,
                data: req.body.data,
                hours: req.body.hours,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }
            
            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                return res.status(406).json({ msg: "O seu orçamento é insuficiente." });
            }

            const partyUpdate = await PartyModel.findByIdAndUpdate(id,party)

            if(!partyUpdate){
               return res.status(404).json({msg: "Error no servidor"})
            }

            res.status(200).json({party, msg: "Servico atualizado"})

        } catch (error) {
            console.log(error);

            res.status(500).json({msg:"Error interno do Servidor"})

        }
    }
};

module.exports = partyController;
