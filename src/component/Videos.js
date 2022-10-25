import React from 'react'
import './videos.css'
import ReactDOM from 'react-dom'

function Videos(props) {

    const handleclick = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted
    }

    
    const handleautoscroll = (e)=>{
        let nextvideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        // agar nextvideo != null
        if(nextvideo){
            nextvideo.scrollIntoView()
            e.target.muted = true
        }
    }

  return (
    // <video src={props.src}  onEnded={handleautoscroll} className='videos' muted='muted' onClick={handleclick} controls >
    // <video src={props.src}  onEnded={handleautoscroll} className='videos' muted='muted' onClick={handleclick}  autoPlay={true}>
    <video src={props.src}  onEnded={handleautoscroll} className='videos' id={props.id}  onClick={handleclick} controls >
    </video>
  )
}

export default Videos
