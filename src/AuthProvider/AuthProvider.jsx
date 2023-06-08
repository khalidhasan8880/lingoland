import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
// provider
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
// context
export const AuthContext = createContext(null)
// main component
const AuthProvider = ({ children }) => {


    const axiosSecure = useAxiosSecure()
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
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
                axiosSecure.post('/jwt',{email:currentUser?.email})
                .then((res)=>{
                    localStorage.setItem('access-token', res?.data?.token)
                })

            } else {
                localStorage.removeItem('access-token')
                // setUser(null)
                // setLoading(false)
            }
        });

        return () => {
            unsubscribe()
        }
    }, [axiosSecure])

    const authInformation = {
        user,
        loading,
        logIn,
        continueWithGoogle,
        createUser,
        name: "khalid",
    }
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;