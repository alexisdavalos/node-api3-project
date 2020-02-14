import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios'

//components
import PostsWrapper from './components/PostsWrapper'


function App() {
  const [posts, setPosts] = useState()
  const [fetch, setFetch]= useState(false);
  const [newPost, setNewPost] = useState({
    name: ''
  })
  const [updatePost, setUpdate] = useState({
    name: '',
    id: ''
  })
  console.log('Update Post:', updatePost)
  // console.log(newPost);
  useEffect(() => {
    axios.get('http://localhost:5000/api/user/') //gets list of posts
    .then(res => {
      console.log('response from localhost:5000:', res)
      console.log('setting data to posts State...', res.data)
      setPosts(res.data.data)
      console.log(`success`)
    })
    .catch( err => console.log(err))
    setFetch(false)
  },[fetch])

  const handleChange = (e) =>{
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    })
    console.log(newPost)
  };
  const handleUpdate = (e) =>{
    setUpdate({
      ...updatePost,
      [e.target.name]: e.target.value
    })
  };
  const handleNewPost = async (e) =>{
    e.preventDefault()
    setFetch(true);
    await axios
    .post('http://localhost:5000/api/user/', newPost)
    .then(res => setFetch(false))
    .catch(err => console.log(err))
    setNewPost({name: ''})
  }
  const handleUpdatePost = async (e) =>{
    e.preventDefault()
    console.log('....updating post.....')
    // setFetch(true);
    axios
    .put(`http://localhost:5000/api/user/${updatePost.id}`, updatePost)
    .then(res => setFetch(true))
    .catch()
    setUpdate({name:'', id: ''})
    setFetch(false);
    
  }
  console.log(`posts State:`, posts)
  return (
    <div className="App">
      <div className="App-Wrapper">
      <header className="App-header">
 
          <h1>Node API III Project</h1>
          <div className='Box'>
            <form onSubmit={e => handleNewPost(e)}>
              <h3>Add Adventurer</h3>
              <label>Name</label>
              <input
                name='name'
                value={newPost.name}
                onChange={handleChange}
              />
              <button>Submit</button>
            </form>
            <form onSubmit={e => handleUpdatePost(e)}>
            <h3>Edit Adventurer</h3>
              <label>Name</label>
              <input
                name='name'
                value={updatePost.name}
                onChange={handleUpdate}
              />
              <label>Identifier</label>
              <input
                name='id'
                value={updatePost.id}
                onChange={handleUpdate}
              />
              <button>Submit</button>
            </form>
          </div>
          <div>
            <PostsWrapper newPost={newPost} setNewPost={setNewPost} updatePost={updatePost} setUpdate={setUpdate} setFetch={setFetch} posts={posts}/>
          </div>
      </header>
      </div>
    </div>
  );
}

export default App;
