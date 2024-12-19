import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';



const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <>
            <App />
        </>
    </BrowserRouter>
);
