import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
// provider
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
// context
export const AuthContext = createContext(null)
// main component
const AuthProvider = ({ children }) => {

    const [enabled, setEnabled] = useState(false) // theme - dark and light
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
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const continueWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUser = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
        }).then(() => {
            console.log('profile update success');
        }).catch(() => {
            console.log('profile update failed');
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                
                axiosSecure.post('/jwt', { email: currentUser?.email })
                    .then((res) => {
                        localStorage.setItem('access-token', res?.data?.token)
                        setUser(currentUser)
                        setLoading(false)
                    })

            } else {
                localStorage.removeItem('access-token')
                setUser(null)
                setLoading(false)
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
        logOut, 
        updateUser,
        setEnabled,
        enabled,
    }
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;