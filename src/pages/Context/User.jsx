import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [userToken, setUserToken] = useState(localStorage.getItem('usertoken'));
    const getData = () => {
        if (userToken != null) {
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
            setPhone(decoded.phone);
            setEmail(decoded.email);
        }
    }
    useEffect(() => {
        getData();
    }, [userToken])

    return (
        <UserContext.Provider value={{ setUserToken, userName, setUserName, email, phone }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;