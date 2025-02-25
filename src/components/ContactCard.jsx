import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../hooks/ContactContext";
import { useNavigate } from "react-router-dom";
import '../style/modal.css'

const API_URL = "https://playground.4geeks.com/contact/agendas/antonio/contacts";

const ContactCard = ({ showModal , setShowModal , id}) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ContactContext);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const foundContact = data.contacts?.find((c) => String(c.id) === String(id));
        if (foundContact) {
          setContact(foundContact);
        } 
      })
      .catch((err) => console.error("Error fetching contacts:", err));
  }, [id]);

  const handleDelete = async () => {
    if (!contact) return;

    await fetch(`${API_URL}/${contact.id}`, { method: "DELETE" });
    dispatch({ type: "DELETE_CONTACT", payload: contact.id });
    setShowModal(false);
    navigate("/");
  };

  if (!contact) return null;

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que quieres borrar a {contact.name}?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleDelete}>Sí</button>
              <button className="cancel" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
