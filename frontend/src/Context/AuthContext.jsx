import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [isAuth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};
