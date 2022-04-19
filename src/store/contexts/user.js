import React, { useReducer, useEffect, useContext } from "react";
import userReducer from "../reducers/user";

const UserContext = React.createContext(null);
let initialUser;

try {
    initialUser = JSON.parse(localStorage.getItem('user')) ?? {}
} catch {
    initialUser = {};
}

export function UserProvider(props) {
    const [user, dispatch] = useReducer(userReducer, initialUser);
    useEffect(() => localStorage.setItem("user", JSON.stringify(user)), [user]);
    const contextValue = {
        user,
        dispatch
    };
    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("use cart must be used within a provider")
    }
    return context; 
}