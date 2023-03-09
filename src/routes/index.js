import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Details from '../components/details';
import Home from '../components/home';
import SignIn from '../components/sign-in';


export default function Routings() {

    return (
        <div>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/home' element={<Home />} />
                <Route path='/details' element={<Details />} />
            </Routes>
        </div>
    )
}
