import React from 'react'
import { Table } from 'react-bootstrap'


const Blogs = ({ blogs, user }) => {

  const BlogRow = (props) => {
    const blog = props.blog
    return (
      <td  id='blog-title' className='title blog-title'><a href={`/blogs/${blog.id}`}>{blog.title}</a></td>
    )
  }

  return (
    <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <td>Blog name</td>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <BlogRow
              blog={blog}
              user={user} />
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Blogs