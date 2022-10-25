import React, { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../context/Authcontext'
import { database } from '../Firebase';
import Post from './Post';
import Uploadfile from './Uploadfile';
import Navbar from './Navbar'


function Feed() {

    const {user , logout} = useContext(Authcontext);
    const [userdata , setuserdata] = useState('');

    useEffect(() =>{
        // snapshot ek eventlistner ki tarah lag jayega 
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) =>{    
            setuserdata(snapshot.data());
        })
        return ()=> {unsub()}
    } , [user])  // useeffect jyada users hone par sabke liye dubara run karega 

  return (

    <>
        <Navbar userdata ={userdata}></Navbar>
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
            {/* <div style={{width:'50%'}}>
                <h1>Wlcome</h1> 
                <button onClick={logout}>log out</button>
                
            </div> */}
            
            <Uploadfile user = {userdata}></Uploadfile>
            <Post userdata = {userdata}></Post>
        </div>
    </>
    
    
    
  )
}

export default Feed
