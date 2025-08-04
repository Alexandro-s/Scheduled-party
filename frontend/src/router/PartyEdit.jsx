
import partyFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '../hook/useToast';
import './Form.css'

const PartyEdit = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const showToast = useToast();

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const filterServices = services.filter((s) => s._id === value);

        let partyServices = party.services;

        if(checked) {
            partyServices = [...partyServices, filterServices[0]];
        } else {
            partyServices = partyServices.filter((s) => s._id !== value);
        }
        
        setParty({...party, services: partyServices});
    };

    const [party, setParty] = useState(null); // Vai ser carregado pelo fetch
    const [services, setServices] = useState([]); // Vai receber os serviços

    useEffect(() => {
        const loadServices = async() => {
            try {
                const res = await partyFetch.get("/services");
                setServices(res.data);
                loadParty();
            } catch (error) {
                console.error("Erro ao carregar serviços:", error);
            }
        };
        const loadParty = async() => {
            try {
                const res = await partyFetch.get(`/parties/${id}`);
                setParty(res.data);
            } catch (error) {
                console.error("Erro ao carregar festa:", error);
            }
        }

        loadServices();

    }, [id]);
 
    const updateParty = async (e) => {
        e.preventDefault();

        // Converte o budget para número
        const budgetNumber = Number(party.budget);

        if (isNaN(budgetNumber)) {
            useToast('Orçamento inválido.', 'error');
            return;
        }

        // Cria um novo objeto party com budget numérico para enviar
        const updatedParty = {
            ...party,
            budget: budgetNumber
        };

        try {
            const res = await partyFetch.put(`/parties/${party._id}`, updatedParty);

            if(res.status === 200) {
                navigate('/');
                useToast('Festa atualizada com sucesso!');
            }

        } catch(error) {
            showToast(error.response?.data?.msg || "Falha ao atualizar festa", "error");
        }
    };

    if(!party) return <p>Loading....</p>
    return (
        <div className="form-page">
            <h2>Editing: {party.title}</h2>
            <p>Edit your party information</p>

            <form onSubmit={updateParty}>
                <label>
                    <span>Party name:</span>
                    <input
                        type="text"
                        placeholder="Be creative"
                        required
                        onChange={(e) => setParty({...party, title: e.target.value})}
                        value={party.title}
                    />
                </label>

                <label>
                    <span>Author:</span>
                    <input
                        type="text"
                        placeholder="Who's throwing the party?"
                        required
                        onChange={(e) => setParty({...party, author: e.target.value})}
                        value={party.author}
                    />
                </label>

                <label>
                    <span>Description:</span>
                    <textarea
                        placeholder="Tell me more"
                        required
                        onChange={(e) => setParty({...party, description: e.target.value})}
                        value={party.description}
                    ></textarea>
                </label>

                <label>
                    <span>Chests</span>
                    <input type="number"
                        placeholder='Number of Peoples'
                        required
                        onChange={(e) => setParty({...party, chests: e.target.value})}
                        value={party.chests}
                    />
                </label>
                <label>
                    <span>Location</span>
                    <input type="text"
                        placeholder='Location of party'
                        required
                        onChange={(e) => setParty({...party, location: e.target.value})}
                        value={party.location}
                    />
                </label>
                <label>
                    <span>Event Data</span>
                    <input type="datetime-local"
                        placeholder='Data and Hours'
                        required
                        onChange={(e) => setParty({...party, eventData: e.target.value})}
                    />
                </label>


                <label>
                    <span>Budget:</span>
                    <input
                        type="number"
                        placeholder="Spending Estimate"
                        required
                        onChange={(e) => setParty({...party, budget: e.target.value})} // mantém string aqui
                        value={party.budget}
                    />
                </label>

                <label>
                    <span>Image:</span>
                    <input
                        type="text"
                        placeholder="Enter an image URL"
                        required
                        onChange={(e) => setParty({...party, image: e.target.value})}
                        value={party.image}
                    />
                </label>

                <input className="btn" type="submit" value="Edit party" />
            </form>

            <div className="container-2">
                <h2>Services</h2>

                <div className="services-container">
                    {services.length === 0 && <p>loading....</p>}

                    {services.length > 0 && services.map((service) => (
                        <div className="service" key={service._id}>
                            <img src={service.image} alt={service.name} />
                            <p className="service-name">{service.name}</p>
                            <p className="service-price">
                                <sup className="rs">R$</sup>{service.price}
                            </p>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    value={service._id}
                                    onChange={(e) => handleServices(e)}
                                    checked={party.services.find((partyService) => partyService._id === service._id) || false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartyEdit;

