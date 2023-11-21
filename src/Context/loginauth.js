import {
    createContext,
    useContext,
} from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const storageData = (data) => {
        localStorage.setItem("idToken", data)
    }

    const getuserData = () => {
        return localStorage.getItem("idToken")
    }

    const removeUserData = () => {
        return localStorage.removeItem("idToken")
    }

    return (
        <AuthContext.Provider
            value={{ storageData, getuserData, removeUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('Cannot access authContext outside AuthContextProvider');
    }
    return auth;
};