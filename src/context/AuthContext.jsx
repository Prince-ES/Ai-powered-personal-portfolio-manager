import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../api/auth.js";
import {getAccessToken} from '../api/auth.js';
import { setNewAccessToken } from '../api/api.js';
import {getUser} from '../api/user.js';
import '../index.css';



export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitialising, setIsInitialising] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        async function getUserInfo(){
            const response = await getUser();
            setUserInfo({email:response.data.email, username:response.data.username, ownerId:response.data.userId});
            console.log("User ID:", response.data);
        }
        async function getToken() {
            try {
                const response = await getAccessToken();

                const token = response.data?.accessToken;
                console.log(token);
                setAccessToken(token);
                setNewAccessToken(token);
                if(token){
                    await getUserInfo();
                }

                

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
            <div className="dashboard flex flex-col items-center justify-center text-2xl text-white">
                    <h1>Hello</h1>
                    <h2>Please wait, page is loading</h2>
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                userInfo,
                setUserInfo,
                isInitialising
            }}
        >
            {children}
            
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}