import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../hooks/ContactContext";
import tanjiroImage from '../assets/img/tanjiro01.jpg';
import { Link, useNavigate } from "react-router-dom";
import ContactCard from "../components/ContactCard";

const API_URL = "https://playground.4geeks.com/contact/agendas/antonio/contacts";

const ContactList = ({ isAddingContact , setIsAddingContact  }) => {
  const { state, dispatch } = useContext(ContactContext);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }, [dispatch]);

  return (
    <div className="container mt-4">
      {!isAddingContact &&
        <div className='d-flex justify-content-end p-3'>
          <Link to='/add'><button className='btn btn-success' onClick={() => setIsAddingContact(true)}>Agregar nuevo contacto</button></Link>
        </div>}
      <div className="list-group">
        {state.contacts?.length > 0 ? (
          state.contacts.map((contact) => (
            <div key={contact.id} className="list-group-item list-group-item-action d-flex align-items-center p-5">
              <div className="me-3" >
                <img src={tanjiroImage} alt="tanjiro" className="contact-image" />
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1">{contact.name}</h5>
                <h6>{contact.address}</h6>
                <small>{contact.phone}</small>
                <p className="mb-1">{contact.email}</p>
              </div>
              <div>
                <i className="fas fa-edit me-5" style={{ cursor: 'pointer' }} onClick={() => navigate(`/edit/${contact.id}`)}></i>
                <i className="fas fa-trash" style={{ cursor: 'pointer' }} onClick={() => setSelectedContactId(contact.id)}></i>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No contacts available</p>
        )}
      </div>
      {selectedContactId !== null  && (
        <ContactCard showModal={true} setShowModal={() => setSelectedContactId(null)} id={selectedContactId} />
      )}

    </div>
  );
};

export default ContactList;
