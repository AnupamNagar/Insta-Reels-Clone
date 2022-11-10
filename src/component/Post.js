import React, { useEffect, useState } from 'react'
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos';
import './post.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';

function Post({userdata}) {

    const [posts , setposts] = useState(null);
    useEffect(()=>{
        let parr = [];
        const unsub = database.posts.orderBy('createdAt' , 'desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data() , postId:doc.id}
                parr.push(data)
            })
            setposts(parr)
        })
        return unsub
    }, [])

    // for auto play using intersection observer Api
    // const callback  = (entries) =>{
    //     entries.forEach((entry)=>{
    //         let ele = entry.target.childNodes[0]
    //         // console.log(ele)
    //         ele.play().then(()=>{
    //             if(!ele.paused && !entry.isIntersecting){
    //                 ele.paused()
    //             }
    //         })
    //     })
    // }

    // let observer = new IntersectionObserver(callback, {threshold:0.6});

    // useEffect(()=>{
    //     const elements = document.querySelectorAll('.videos')
    //     elements.forEach((element)=>{
    //         observer.observe(element)
    //     })
    //     return ()=>{
    //         observer.disconnect();
    //     }
    // },[posts])


  return (
    <div>
      {
        posts == null || userdata == null ? <CircularProgress /> :
        <div className='video-container'>
            {
                posts.map((post , index) =>(
                 
                    <React.Fragment key={index}

                    >
                        <div className='videos'>
                            <Videos src = {post.pUrl}></Videos>
                            <div className='video-info'>
                            <div style={{display:'flex'}}>
                                    <Avatar  src={post.uprofile}/>
                                    <h4>{post.uName}</h4>
                                </div>
                            </div>
                            <div className='like-info'>
                                <Like userdata={userdata} postdata={post}></Like>
                            </div>
                            
                        </div>
                    </React.Fragment>
                ))
            }
        </div>

      }
    </div>
  )
}

export default Post
