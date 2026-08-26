import { createContext, useContext, useState, useEffect } from "react";
import {getAccessToken} from '../api/auth.js';
import { setNewAccessToken } from '../api/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitialising, setIsInitialising] = useState(true);

    useEffect(() => {
        async function getToken() {
            try {
                const response = await getAccessToken();

                const token = response.data?.accessToken;
                console.log('accessToken:', token);
                setNewAccessToken(token);
                setAccessToken(token);
            } catch (error) {
                console.log("No valid refresh token", error);
            } finally {
                setIsInitialising(false);
            }
        }

        getToken();
    }, []);

    if(isInitialising){
        return (
            <>
                <h1>Hello</h1>
                <h2>Please wait, page is loading</h2>
            </>
        )
    }
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}