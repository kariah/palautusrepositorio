import React  from 'react'


const User = ({ user }) => {
  if (!user) {
    return null
  }

  if (!user.blogs === 0) {
    <div>
      <h2>{user.name}</h2>
      <h3>User has no blogs</h3>
    </div>
  }

  const blogs = user.blogs

  //   const Courses = (props) => {
  //     const courses = props.courses

  //     return (
  //         <div>
  //             <div>
  //                  {courses.map(course => <Course key={course.id} course={course} />)}
  //             </div>
  //         </div>
  //     )
  // }


  const UserBlog = () => {
    // const name = props.course.name
    // const parts = props.course.parts

    return (
      <div>
        {/* <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} /> */}
      </div>
    )
  }


  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <div>
        {blogs.map(blog => <UserBlog key={blog.id} course={blog} />)}
      </div>
    </div>
  )
}

export default User