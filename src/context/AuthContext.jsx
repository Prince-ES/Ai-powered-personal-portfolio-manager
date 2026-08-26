import { createContext, useContext, useState, useEffect } from "react";
import {getAccessToken} from '../api/auth.js';
import { setNewAccessToken } from '../api/api.js';
import {getUser} from '../api/user.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitialising, setIsInitialising] = useState(true);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        async function getUserInfo(){
            const response = await getUser();
            setUserInfo({email:response.data.email, username:response.data.username});
        }
        async function getToken() {
            try {
                const response = await getAccessToken();

                const token = response.data?.accessToken;

                if(token){
                    getUserInfo();
                }

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
        <AuthContext.Provider value={{ accessToken, setAccessToken, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}