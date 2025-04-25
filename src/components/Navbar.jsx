import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Contactos</Link>
        </li>
        <li>
          <Link to="/add">Agregar Contacto</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;