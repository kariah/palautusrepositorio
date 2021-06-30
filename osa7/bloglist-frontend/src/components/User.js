import React  from 'react'


const User = ({ user }) => {
  console.log('user from Route ', user)
  if (!user) {
    return null
  }

  const blogs = user.blogs

  if (blogs.length === 0) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>User has no blogs</h3>
      </div>)
  }

  function Bloglist(props) {
    const blogs = props.blogs
    const list = blogs.map((blog) =>
      <li key={blog.id}>{blog.title}</li>
    )
    return (
      <ul>{list}</ul>
    )
  }


  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <div><Bloglist blogs={blogs}></Bloglist>{console.log('blogs (user) ', blogs)}</div> 
    </div>
  )
}

export default User