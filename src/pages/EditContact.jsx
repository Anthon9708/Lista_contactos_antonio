import { useState, useContext, useEffect } from "react";
import { ContactContext } from "../hooks/ContactContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "https://playground.4geeks.com/contact/agendas/antonio/contacts";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(ContactContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => {
        const foundContact = data.contacts.find((contact) => contact.id === parseInt(id));
        if (foundContact) {
          setForm({
            name: foundContact.name || "",
            email: foundContact.email || "",
            phone: foundContact.phone || "",
            address: foundContact.address || "",
          });
        }
      })
      .catch((err) => console.error("Error fetching contact:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updatedContact = await response.json();
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-75">
      <h2 className="text-center m-3">Editar Contacto</h2>
        <form onSubmit={handleSubmit} >
          <div className="my-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Telefono</label>
            <input name="phone" className="form-control" value={form.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input name="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input name="address" className="form-control" value={form.address} onChange={handleChange} />
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

export default EditContact;
