import React, { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const AGENDA_SLUG = 'david';
  const API_URL = `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error('No se pudieron cargar los contactos');
      }
      const data = await response.json();
      setContacts(data.contacts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error('No se pudo agregar el contacto');
      }
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });
      if (!response.ok) {
        throw new Error('No se pudo actualizar el contacto');
      }
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el contacto');
      }
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, loading, error, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
