import React, { createContext, useState } from 'react'


export const Context = createContext();

export const DataProvider = (props) => {
    const [userData, setUserData] = useState({
        id: localStorage.getItem('id') ? localStorage.getItem('id') : '',
        name: localStorage.getItem('name') ? localStorage.getItem('name') : 'user',
        type: localStorage.getItem('type') ? localStorage.getItem('type') : '',
        isLoggedIn:localStorage.getItem('isLoggedIn')?localStorage.getItem('isLoggedIn'): false,
        photo: localStorage.getItem('photo') ? localStorage.getItem('photo') : '',
        email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
    });

    const baseData = {};

    return (
        <Context.Provider value={[baseData, userData, setUserData]}>
            {props.children}
        </Context.Provider>
    )
}