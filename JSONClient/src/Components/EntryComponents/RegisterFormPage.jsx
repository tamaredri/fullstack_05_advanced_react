import React, { useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import classes from '../../modules_css/Login.module.css'

const RegisterFormPage = ({ onRegister }) => {
    const location = useLocation();
    const { username, password } = location.state || {};

    const nameRef = useRef('');
    const emailRef = useRef('');
    const streetRef = useRef('');
    const suiteRef = useRef('');
    const cityRef = useRef('');
    const zipcodeRef = useRef('');
    const latRef = useRef('');
    const lngRef = useRef('');
    const phoneRef = useRef('');
    const companyNameRef = useRef('');
    const catchPhraseRef = useRef('');
    const bsRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:3000/users`);
        const existingUsers = response.data;
        const largestUser = existingUsers.reduce((maxId, user) => {
            return parseInt(user.id) > maxId ? parseInt(user.id) : maxId;
        }, 0);

        const formData = {
            id: String(largestUser + 1),
            name: nameRef.current.value,
            username: username,
            email: emailRef.current.value,
            address: {
                street: streetRef.current.value,
                suite: suiteRef.current.value,
                city: cityRef.current.value,
                zipcode: zipcodeRef.current.value,
                geo: {
                    lat: latRef.current.value,
                    lng: lngRef.current.value,
                },
            },
            phone: phoneRef.current.value,
            website: password,
            company: {
                name: companyNameRef.current.value,
                catchPhrase: catchPhraseRef.current.value,
                bs: bsRef.current.value,
            },
        };

        try {
            const user = await axios.post('http://localhost:3000/users', formData, { 'Headers': { 'Content-Type': "application/json" } });
            onRegister(user.data.id);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div className={classes.loginCard}>
            {(username === undefined || password === undefined) ? <Navigate to="/register" /> :

                <div>
                    <h2 className={classes.headline}>{username}, please fill out the form:</h2>

                    <form className={classes.form} onSubmit={handleSubmit}>

                        <div>
                            <p>Personal information:</p>
                        </div>

                        <input
                            type="text"
                            ref={nameRef}
                            placeholder="name"
                            required />

                        <input
                            type="email"
                            placeholder="email"
                            ref={emailRef}
                            required />

                        <input
                            type="text"
                            placeholder="phone"
                            ref={phoneRef}
                            required />

                        <div>
                            <p>Address:</p>
                        </div>

                        <input
                            type="text"
                            placeholder="street"
                            ref={streetRef}
                        />

                        <input
                            type="text"
                            placeholder="suite"
                            ref={suiteRef} />

                        <input
                            type="text"
                            placeholder="city"
                            ref={cityRef} />

                        <input
                            type="text"
                            placeholder="zipcode"
                            ref={zipcodeRef} />

                        <input
                            type="text"
                            placeholder="geo lattitude"
                            ref={latRef} />

                        <input
                            type="text"
                            placeholder="geo longitude"
                            ref={lngRef} />

                        <div>
                            <p>Company:</p>
                        </div>

                        <input
                            type="text"
                            placeholder="company name"
                            ref={companyNameRef} />

                        <input
                            type="text"
                            placeholder="catch phrase"
                            ref={catchPhraseRef} />

                        <input
                            type="text"
                            placeholder="BS"
                            ref={bsRef} />

                        <button type="submit">Submit</button>
                    </form>
                </div>}
        </div>
    );
};

export default RegisterFormPage;


