// Importando hooks do React
import { useState, useEffect } from "react";

// Importando configuração do axios para requisições HTTP
import partyFetch from '../axios/config';

// Importando hook de navegação do React Router
import { useNavigate } from 'react-router-dom';

// Importando o CSS da página de formulário
import './Form.css'

// Importando o hook useToast

import useToast from '../hook/useToast'

// Componente principal responsável por criar uma festa
const CreateParty = () => {

    // Ativa o Hook Navigate 

    const navigate = useNavigate();

    // States para controle dos campos do formulário
    const [services, setServices] = useState([]); // Armazena os serviços disponíveis vindos da API
    const [title, setTitle] = useState(""); // Nome da festa
    const [author, setAuthor] = useState(""); // Nome do autor/organizador
    const [description, setDescription] = useState(""); // Descrição da festa

    const [ guests, setGuests] = useState(0);
    const [location, setLocation] = useState("");
    const [eventData, setEventeData] = useState("")
    const [budget, setBudget] = useState(0); // Orçamento estimado
    const [image, setImage] = useState(""); // URL da imagem da festa
    const [partyService, setPartyService] = useState([]); // Serviços selecionados pelo usuário

    // Hook de efeito para carregar os serviços assim que o componente for montado
    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get("/services"); // Faz a requisição GET para buscar os serviços
            setServices(res.data); // Atualiza o state com os dados retornados da API
        }
        loadServices();
    }, []);

    // Função para adicionar ou remover serviços selecionados
    const hanleServices = (e) => {
        const checked = e.target.checked; // Verifica se o checkbox foi marcado
        const value = e.target.value; // Pega o ID do serviço selecionado

        // Filtra o serviço correspondente ao ID
        const filterService = services.filter((s) => s._id === value);

        if (checked) {
            // Adiciona o serviço ao array de serviços selecionados
            setPartyService((services) => [...services, filterService[0]]);
        } else {
            // Remove o serviço do array de serviços selecionados
            setPartyService((services) => services.filter((s) => s._id !== value));
        }


        console.log(partyService);
    };

    // Função responsável por criar uma nova festa
    const createParty = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        // Cria objeto com os dados preenchidos no formulário
        const party = {
            title,
            author,
            description,
            guests,
            location,
            eventData,
            budget,
            image,
            services: partyService,
        };


        console.log(party);


        const res = await partyFetch.post("/parties", party);

        if (res.status === 201) {
            navigate("/");
            useToast(res.data.msg);
        }
    };

    return (
        <div className="form-page">
            <h2>Create your next party</h2>
            <p>Set your budget and choose services</p>

            {/* Formulário de criação de festa */}
            <form onSubmit={createParty}>
                <label>
                    <span>Party name:</span>
                    <input
                        type="text"
                        placeholder="Be creative"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>
                    <span>Author:</span>
                    <input
                        type="text"
                        placeholder="Who's throwing the party?"
                        required
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                    />
                </label>

                <label>
                    <span>Description:</span>
                    <textarea
                        placeholder="Tell me more"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </label>
                <label>
                    <span>Guests</span>
                    <input type="number"
                        placeholder="Number of Person"
                        required
                        onChange={(e) => setGuests(e.target.value)}
                    />

                    </label>
                    <label>
                        <span>Location</span>
                        <input type="text"
                            placeholder="party Location"
                            required
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label>
                            <span>Data and Hours</span>
                            <input type="datetime-local"
                                placeholder="Data and hours of party"
                                required
                                onChange={(e) => setEventeData(e.target.value)}
                            />

                        </label>

                </label>

                <label>
                    <span>Budget:</span>
                    <input
                        type="number"
                        placeholder="Spending Estimate"
                        required
                        onChange={(e) => setBudget(e.target.value)}
                        value={budget}
                    />
                </label>

                <label>
                    <span>Image:</span>
                    <input
                        type="text"
                        placeholder="Enter an image URL"
                        required
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>

                {/* Botão de envio do formulário */}
                <input className="btn" type="submit" value="Create party" />
            </form>

            {/* Container com os serviços disponíveis */}
            <div className="container-2">
                <h2>Services</h2>

                <div className="services-container">
                    {/* Exibe mensagem enquanto os dados estão sendo carregados */}
                    {services.length === 0 && <p>loading....</p>}

                    {/* Lista os serviços disponíveis */}
                    {services.length > 0 && services.map((service) => (
                        <div className="service" key={service._id}>
                            <img src={service.image} alt={service.name} />
                            <p className="service-name">{service.name}</p>
                            <p className="service-price">
                                <sup className="rs">R$</sup>{service.price}
                            </p>
                            <div className="checkbox-container">
                                {/* Checkbox para selecionar o serviço */}
                                <input
                                    type="checkbox"
                                    value={service._id}
                                    onChange={hanleServices}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreateParty;
