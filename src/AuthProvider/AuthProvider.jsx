import { createContext,  useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
// provider
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
// context
export const AuthContext = createContext(null)
// main component
const AuthProvider = ({ children }) => {



    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const continueWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }


 
    const authInformation = {
        user,
        loading,
        logIn,
        continueWithGoogle,
        createUser,
    }
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;