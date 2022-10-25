import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import './profile.css';
// import Videos from './Videos';

function Profile() {

    const {id} = useParams();
    const [userdata , setuserdata] = useState(null);
    const [posts , setposts] = useState(null);

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setuserdata(snap.data())
        })
    }, [id])  // componentdidmount

    useEffect(()=>{
        if(userdata != null){
            let parr  = []
            for(let i=0; i<userdata.postIds.length; i++){
                let postdata = database.posts.doc(userdata.postIds[i]).get()
                parr.push(postdata.data)
            }
            setposts(parr)
        }
    }, [userdata])
  return (
    <>
    {
        posts==null || userdata==null ? <CircularProgress></CircularProgress> :
        <>
            <Navbar userdata={userdata}></Navbar>
            <div className='main-container'>
                <div className='container'>
                    <div className='upper-part'>
                        <div className='profile-img'>
                            <img alt='' src={userdata.profileUrl}></img>
                        </div>
                        <div className='info'>
                            <Typography variant='h5'>
                                Email : {userdata.email}
                            </Typography>
                            <Typography variant='h6'>
                                posts :  {userdata.postIds.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginTop:"3rem" , marginBottom:"3rem"}}></hr>
                    <div className='profile-videos'>
                        {
                            posts.map((userdata , index) => (
                                <React.Fragment key={index}>
                                    <video src={posts.pUrl}></video>
                                </React.Fragment>
                            ))
                           
                        }
                    </div>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default Profile
