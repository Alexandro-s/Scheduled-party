import { useNavigate, useParams } from "react-router-dom"
import './Party.css'
import { useEffect, useState, useRef } from "react";
import partyFetch from "../axios/config";
import { Link } from "react-router-dom";
import useToast from "../hook/useToast";
import { motion } from "motion/react"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo } from "react";





const Party = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [party, setParty] = useState(null);

  const carousel = useRef();
  const [width, setWidth] = useState(0);


  const dataEvent = useMemo(() => {

  
    if (!party?.createdAt) return "";

    const parsedDate = new Date(party?.createdAt);
    if (isNaN(parsedDate)) return "Date invalid"


    const formatted = format(parsedDate, "dd/MM/yyyy 'às' HH:mm", {
      locale: ptBR,
    });

    return formatted;

  }, [party?.createdAt])



  useEffect(() => {
    const loadParty = async () => {

      try {
        const res = await partyFetch.get(`/parties/${id}`);
        setParty(res.data);


        console.log(res.data)
      } catch (error) {
        console.log("Error ao carregar a party", error)

      }

    }
    if (id) loadParty();
  }, [id]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (carousel.current) {
        const scrollW = carousel.current.scrollWidth;
        const offsetW = carousel.current.offsetWidth;
        setWidth(scrollW - offsetW);
      }
    }, 100); 

    return () => clearTimeout(timeout);
  }, [party?.services?.length]);




  const handleDelete = async () => {
    const res = await partyFetch.delete(`/parties/${id}`);

    if (res.status === 200) {
      navigate("/");
      useToast(res.data.msg);
    }
  };

  if (!party || !party.title) return <p>loading....</p>

  return (



    <div className="party-container">
      <div className="title-container">
       <h1>{party.title}</h1>
       <p>Budge R$:{party.budget}</p>
      </div>
   
      <div className="summary-actions-wrapper">
        <div className="summary-container">
          <h2>Summary Party 🎉</h2>

          <div className="inner-summary">
            <div className="summary-item">
              <span className="icon">📍</span>
              <span>{party.location}</span>
            </div>

            <div className="summary-item">
              <span className="icon">📅</span>
              <span>{dataEvent}</span>
            </div>

            <div className="summary-item">
              <span className="icon">👥</span>
              <span>{party.guests} guests</span>
            </div>
          </div>
        </div>






        <div className="actions-container">
          <Link to={`/party/edit/${party._id}`} className="btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn-delete" >Delete</button>
        </div>
      </div>

<div className="title-carousel"><h2>Registered Services</h2></div>

      <motion.div ref={carousel} className='carousel' whileTap={{ cursor: "grabbing" }}>
        <motion.div className='inner'
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          dragTransition={{ power: 0.2, timeConstant: 300, modifyTarget: v => v * 0.8 }}

        >
          {party.services.map(service => (
            <motion.div className='item' key={service._id}>
              <img src={service.image} alt={service.name} />
              {/* <button className="btn-card">🗑️</button> */}
              <p>{service.name}</p>


            </motion.div>

          ))}

        </motion.div>

      </motion.div>





      {/* <div className="services-container">
            <h2>Contracted Services</h2>
            {party.services.map((service) => (
                <div className="service-card" key={service._id}>
                    <img src={service.image} alt={service.name} />
                    <button className="btn-card">🗑️</button>
                    <p>{service.name}</p>


                </div>
            ))}
        </div>  */}
    </div>
  )
}

export default Party