import React, { useState } from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../Firebase'

function Uploadfile(props) {
    const [error , seterror] = useState('');
    const [loading , setloading] = useState(false);

    const handlechange = async(file)=>{
        if(file == null){
            seterror('please a select a file first ');
            setTimeout(() => {
                seterror('')
            }, 3000);
            return;
        }
        if(file.size/(1024*1024) > 100){
            seterror('this file is very big please select file that is less than 100mb');
            setTimeout(() => {
                seterror('')
            }, 3000);
            return;
        }

        //post upload karne ke liye 
        let uid = uuidv4();
        setloading(true);
        const uploadtask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadtask.on('state_changed' , fn1, fn2 , fn3);

        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            console.log(`upload is ${progress} % done .`)
        }
        function fn2(err){
            seterror(err.message);
            setTimeout(() =>{
            seterror('')
            }, 2000)
            setloading(false);
            return ;
        }
        function fn3(){
            uploadtask.snapshot.ref.getDownloadURL().then((url) =>{
            console.log(url);
            let obj = {
                likes : [],
                comments : [],
                pId: uid,
                pUrl: url,
//                 uName: props.user.fullname,
//                 uprofile : props.user.profileUrl,
                userId : props.user.userId,
                createdAt : database.getTimeStamp()
            }
            database.posts.add(obj).then(async(ref)=>{
                 await database.users.doc(props.user.userId).update({
                    postIds : props.user.postIds != null ? [...props.user.postIds , ref.id] : [ref.id]
                    // user ke pas pahle se postids nahi h isliye ye logic lagana padta h
                })
            }).then(()=>{
                setloading(false)
            }).catch((err) =>{
                seterror(err.message);
//                 console.log(err.response);
                setTimeout(() => {
                    seterror('')
                }, 3000);
                setloading(false)
            })
            })
            // setloading(false) 
        }
    }
  return (
    <div >
        {
            error !== '' ? <Alert severity="error">This is an error alert — check it out!</Alert> :
            <>
             <input type='file' accept= 'video/*' style ={{display:'none'}} id = "upload-input"  onChange={(e) => handlechange(e.target.files[0])}></input>
             <label htmlFor='upload-input'>
             <Button variant="outlined" disabled={loading} 
                component = 'span'> 
               {/* <MovieIcon /> &nbsp; upload videos */}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>

             </Button>
             </label>
             { loading && <LinearProgress style={{marginTop:'3%'}}/>}
            </>
        }
    </div>
    
  )
}

export default Uploadfile

// component = 'span' dene se ab button input ke liye work karna start kar dega 

