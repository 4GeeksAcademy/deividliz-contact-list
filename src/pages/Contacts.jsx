import React, { useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
  const { contacts, loading, error } = useContext(ContactContext);

  if (loading) {
    return <p>Cargando contactos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="contact-list">
      <h1>Lista de Contactos</h1>
      {Array.isArray(contacts) && contacts.length === 0 && <p>No hay contactos agregados a la agenda.</p>}
      {Array.isArray(contacts) &&
        contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)}
    </div>
  );
};

export default Contacts;
