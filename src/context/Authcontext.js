import React from "react";
import { useState , useEffect } from "react";
import { auth } from "../Firebase";

export const  Authcontext = React.createContext();

export function Authprovider ({children}){
    const [user , setuser]  = useState('');
    const [loading , setloading] = useState(true);

    function signup(email , password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email , password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    function forgotpasssword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(()=>{
        let unsub = auth.onAuthStateChanged((user) =>{
            setuser(user);
            setloading(false);
        })

        return() =>{
            unsub();
        }
    } , [])  // componentdidmount

    const store = {
        user, 
        signup,
        login,
        logout,
        forgotpasssword
    }

    return (
        <Authcontext.Provider value={store}>
            {/* { Children } */}
            { !loading && children}  
            {/* agar loading nahi h to children ko show karva do ! */}
        </Authcontext.Provider>
    )
}

// export default Authprovider