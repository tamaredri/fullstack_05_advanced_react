// FormPage.js
import React, { useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const RegisterFormPage = ({onRegister}) => {
    const navigate = useNavigate();
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
        const formData = {
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
            console.log(formData);
            await axios.post('http://localhost:3000/users', formData, { 'Headers': { 'Content-Type': "application/json" } });
            // Handle successful submission (e.g., redirect, show a message)
            onRegister(username);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div>
            {(username === undefined || password === undefined) ? <Navigate to="/register"/> :
                <div>
                    <h2>{username}, Fill Out the Form:</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input type="text" ref={nameRef} required />
                        </div>

                        <div>
                            <label>Email:</label>
                            <input type="email" ref={emailRef} required />
                        </div>

                        <div>
                            <label>Phone:</label>
                            <input type="text" ref={phoneRef} required />
                        </div>

                        <div>
                            <label>Street:</label>
                            <input type="text" ref={streetRef} />
                        </div>

                        <div>
                            <label>Suite:</label>
                            <input type="text" ref={suiteRef} />
                        </div>

                        <div>
                            <label>City:</label>
                            <input type="text" ref={cityRef} />
                        </div>

                        <div>
                            <label>Zipcode:</label>
                            <input type="text" ref={zipcodeRef} />
                        </div>

                        <div>
                            <label>Geo Lat:</label>
                            <input type="text" ref={latRef} />
                        </div>

                        <div>
                            <label>Geo Lng:</label>
                            <input type="text" ref={lngRef} />
                        </div>

                        <div>
                            <label>Company Name:</label>
                            <input type="text" ref={companyNameRef} />
                        </div>

                        <div>
                            <label>CatchPhrase:</label>
                            <input type="text" ref={catchPhraseRef} />
                        </div>

                        <div>
                            <label>BS:</label>
                            <input type="text" ref={bsRef} />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>}
        </div>
    );
};

export default RegisterFormPage;


