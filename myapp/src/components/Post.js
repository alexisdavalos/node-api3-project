import React from 'react'
import axios from 'axios'

const Post = (props) =>{
    // console.log('Props Inside Post.js:', props)
    const handleDelete = (e) =>{
        console.log('deleting...', props.post)
        e.preventDefault();
        props.setFetch(true)
        axios.delete(`http://localhost:5000/api/user/${props.post.id}`)
        .then(res=> props.setFetch(false))
        .catch(err => console.log(err))
        
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        props.setUpdate({...props.post})
    }

    return(
        <div className='user'>
            <h5>Adventurer: {props.post.name}</h5>
            <p>Identifier: {props.post.id}</p>
            <button className='deleteButton' onClick={(e) => handleDelete(e)}>Delete</button>
            <button onClick={(e) => handleUpdate(e)}>Update</button>
        </div>
    )
}

export default Post;