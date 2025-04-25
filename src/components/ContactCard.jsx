import React, { useContext, useState } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactCard = ({ contact }) => {
  const { deleteContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteContact(contact.id);
    setShowModal(false);
  };

  const handleEdit = () => {
    navigate(`/edit/${contact.id}`);
  };

  return (
    <div className="contact-card">
      <h3><Link to={`/contact/${contact.id}`}>{contact.name}</Link></h3>
      <p>Email: {contact.email}</p>
      <p>Teléfono: {contact.phone}</p>
      <p>Dirección: {contact.address}</p>
      <div>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>¿Estás seguro de que quieres eliminar este contacto?</p>
        <button onClick={confirmDelete}>Sí</button>
        <button onClick={() => setShowModal(false)}>No</button>
      </Modal>
    </div>
  );
};

export default ContactCard;