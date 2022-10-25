import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../Firebase';

function Like({userdata , postdata}) {
    const [like , setlike] = useState(null);

    useEffect(()=>{
        let check = postdata.likes.includes(userdata.userId) ? true : false
        setlike(check)
    },[postdata])

    const handlelike =() =>{
        if(like === true){
            let narr = postdata.likes.filter((el) => el !== userdata.userId)
            database.posts.doc(postdata.postId).update({
                likes:narr
            })
        }
        else{
            let narr = [...postdata.likes , userdata.userId]
            database.posts.doc(postdata.postId).update({
                likes:narr
            })
        }
    }

  return (
    <div>
      {
        like != null ?
        <>
            {
                like===true ? <FavoriteIcon className={`icon-styling  like`} onClick={handlelike} /> :<FavoriteIcon  className={`icon-styling  unlike`} onClick={handlelike} />
            }
        </> :
        <></>
      }
    </div>
  )
}

export default Like
