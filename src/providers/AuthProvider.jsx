import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContex = createContext(null)
const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const axiosPublic = useAxiosPublic()

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name,photo) =>{
       return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : photo
        })
    }

    useEffect(()=>{
     const unsubscribe =    onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            console.log('current',currentUser);
            if(currentUser){
                //get token
                const userInfo = {email  : currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            }
            else{
                //do someting
                //remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        })
        return ()=>{
            return unsubscribe()
        }
    },[axiosPublic])


    const authInfo = {user,loading,createUser,signIn,logOut,updateUserProfile,googleSignIn}

    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;