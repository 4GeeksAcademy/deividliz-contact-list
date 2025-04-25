import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../contexts/ContactContext';

const AddContact = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { contacts, addContact, updateContact } = useContext(ContactContext);

  const isEditing = id !== undefined;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loadingContact, setLoadingContact] = useState(isEditing);
  const [errorFinding, setErrorFinding] = useState(null);

  useEffect(() => {
    if (isEditing && contacts.length > 0) {
      setLoadingContact(true);
      setErrorFinding(null);
      const contactToEdit = contacts.find(c => c.id === parseInt(id));

      if (contactToEdit) {
        setContact({
          name: contactToEdit.name || '',
          email: contactToEdit.email || '',
          phone: contactToEdit.phone || '',
          address: contactToEdit.address || '',
        });
      } else {
        console.error(`No se encontró el contacto con id: ${id}`);
        setErrorFinding(`No se encontró el contacto con id: ${id}`);
      }
      setLoadingContact(false);
    } else if (!isEditing) {
      setContact({ name: '', email: '', phone: '', address: '' });
      setLoadingContact(false);
      setErrorFinding(null);
    }
  }, [id, contacts, isEditing]);


  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateContact(parseInt(id), contact);
    } else {
      addContact(contact);
    }
    navigate('/');
  };

  if (loadingContact && isEditing) {
    return <p>Cargando datos del contacto para editar...</p>;
  }

  if (errorFinding) {
    return (
      <div>
        <p>Error: {errorFinding}</p>
        <button onClick={() => navigate('/')}>Volver a la lista</button>
      </div>
    );
  };


  return (
    <div className="add-contact-form">
      <h2>{isEditing ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          value={contact.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={contact.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={contact.address}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Actualizar Contacto' : 'Agregar Contacto'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddContact;