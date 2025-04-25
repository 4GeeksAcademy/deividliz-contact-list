import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import {  ContactProvider}  from './contexts/ContactContext';

const Main = () => {
    return (
        <React.StrictMode>  
            <ContactProvider> 
                <RouterProvider router={router}>
                </RouterProvider>
            </ContactProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)