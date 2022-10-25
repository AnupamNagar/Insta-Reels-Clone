import React, { useEffect } from 'react'
import vid1 from '../Videos/vid1.mp4';
import vid2 from '../Videos/vid2.mp4';
import vid3 from '../Videos/vid3.mp4';


function IntersectionObserverApi() {
    const callback  = (entries) =>{
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            // console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.paused()
                }
            })
        })
    }

    let observer = new IntersectionObserver(callback, {threshold:0.6});

    useEffect(()=>{
        const elements = document.querySelectorAll('.videos')
        elements.forEach((element)=>{
            observer.observe(element)
        })
    },[])

  return (
    <div className='video-container'>
        <div className='videos'>
            <video src={vid1} style={{height:'85vh'}} muted='muted' ></video>
        </div>
        <div className='videos'>
            <video src={vid2} style={{height:'85vh'}} muted='muted' ></video>
        </div>
        <div className='videos'>
            <video src={vid3} style={{height:'85vh'}} muted='muted' ></video>
        </div>      
    </div>
  )
}

export default IntersectionObserverApi
