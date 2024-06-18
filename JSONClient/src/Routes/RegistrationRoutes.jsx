import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from '../Components/RegisterPage'
import RegisterFormPage from '../Components/RegisterFormPage'

function Registration({ onRegister }) {
    return (
        <Routes>
            <Route index element={<RegisterPage />} />
            <Route path="/form" element={<RegisterFormPage onRegister={onRegister} />} />
        </Routes>
    )
}

export default Registration
