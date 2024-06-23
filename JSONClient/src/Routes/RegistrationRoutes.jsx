import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from '../Components/EntryComponents/RegisterPage'
import RegisterFormPage from '../Components/EntryComponents/RegisterFormPage'

function Registration({ onRegister }) {
    return (
        <Routes>
            <Route index element={<RegisterPage />} />
            <Route path="/form" element={<RegisterFormPage onRegister={onRegister} />} />
        </Routes>
    )
}

export default Registration
