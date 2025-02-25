import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ContactProvider } from './hooks/ContactContext'
import ContactList from './pages/ContactList'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact';
import './index.css'

const Main = () => {
    const [isAddingContact, setIsAddingContact] = useState(false);

    return (
        <ContactProvider>
            <Router>
                <div className='container'>
                    <h1 className='text-center p-4'>Agenda de contactos</h1>

                    <Routes>
                        <Route path='/' element={<ContactList  isAddingContact={isAddingContact} setIsAddingContact={setIsAddingContact} />} />
                        <Route path='/add' element={<AddContact setIsAddingContact={setIsAddingContact} />} />
                        <Route path="/edit/:id" element={<EditContact />} />
                    </Routes>
                    
                </div>
            </Router>
        </ContactProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
