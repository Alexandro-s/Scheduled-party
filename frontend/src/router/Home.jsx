// AXIOS - PartyFeacht

import { useState } from "react";
import { useEffect } from "react";
import partyFetch from "../axios/config";
import { Link } from "react-router-dom";
import './Home.css';


const Home = () => {
    // Salvaparties com useStates
    const [parties, setParties] = useState(null);

    useEffect(() => {
        const loadParties = async () => {
            const res = await partyFetch.get("/parties");

            console.log(res)

            setParties(res.data)
        };

        loadParties()
    }, []);

    // cria um loading - Se for ! de festa retorna 

    if(!parties) return <p>Loading......</p>
    return (
        <div className="home">
            <h1>Yours Parties</h1>
            <div className="parties-container">
                {parties.lenght === 0 && <p>The are no parties in the catalog</p>}
                {parties.map((party) => (
                    <div className="party" key={party._id}>
                          <img src={party.image} alt={party.title} />
                          <div className="description-container"><h3>{party.title}</h3> 
                          <Link to={`/party/${party._id}`} className="btn-secondary">Detalhes</Link></div>
                    </div>
                  
                ))}
            </div>
        </div>
    )
};

export default Home;

// requicicoes 