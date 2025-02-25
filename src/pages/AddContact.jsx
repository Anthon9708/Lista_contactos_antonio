import { useState, useContext } from "react";
import { ContactContext } from "../hooks/ContactContext";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://playground.4geeks.com/contact/agendas/antonio/contacts";

const AddContact = ( {setIsAddingContact} ) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ContactContext);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newContact = await response.json();
    dispatch({ type: "ADD_CONTACT", payload: newContact });
    navigate('/')
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-75">
        <h2 className="text-center m-3">Agregar Nuevo Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input name="name" className="form-control" onChange={handleChange} placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Telefono</label>
            <input name="phone" className="form-control" onChange={handleChange} placeholder="Phone" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input name="email" className="form-control" onChange={handleChange} placeholder="Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input name="address" className="form-control" onChange={handleChange} placeholder="Address" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Guardar</button>
          <div className="mb-3">
            <Link to='/' onClick={() => setIsAddingContact(false)}>Volver a los contactos</Link>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddContact;
