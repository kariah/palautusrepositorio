import React  from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogs = user.blogs

  if (blogs.length === 0) {
    return (
      <div>
        <h3>User has no blogs</h3>
      </div>)
  }

  // function Bloglist(props) {
  //   const blogs = props.blogs
  //   const list = blogs.map((blog) =>
  //     <li key={blog.id}>{blog.title}</li>
  //   )
  //   return (
  //     <ul>{list}</ul>
  //   )
  // }

  return(
    <div>
      <h4>Added blogs</h4>
      <ListGroup striped>
        {blogs.map((blog) =>
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default User