import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContactContext } from '../contexts/ContactContext';
import ContactCard from '../components/ContactCard'; 

const ContactDetail = () => {
  const { id } = useParams(); 
  const { contacts, loading, error } = useContext(ContactContext);

  if (loading) {
    return <p>Cargando detalles del contacto...</p>;
  }

  if (error) {
    return <p>Error al cargar detalles: {error}</p>;
  }

  const contact = contacts.find(c => c.id === parseInt(id));

  if (!contact) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>El contacto no fue encontrado.</p>
        <Link to="/">Volver a la lista de contactos</Link>
      </div>
    );
  }

  return (
    <div className="contact-detail-view" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Detalle del Contacto</h1>
      <ContactCard contact={contact} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/">Volver a la lista</Link>
      </div>
    </div>
  );
};

export default ContactDetail;
