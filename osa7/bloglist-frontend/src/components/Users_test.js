import React from 'react'
// import _, {  } from 'lodash'

const Users = ({ users }) => {

  // console.log('users (Users) ', users)
  //Testing
  // const result = _(blogs)
  //   .groupBy('author')
  //   .map((author, id) => ({
  //     author: id,
  //     blogCount: _.countBy(author, 'author')
  //   }))
  //   .value()

  if (users === undefined || users === null || users.blogs === undefined || users.blogs.length === 0)
  {
    return <></>
  }

  return (
    <div>
      <table>
        <tr>
          <td></td>
          <td><b>Blogs created</b></td>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td> {user.name} {console.log('user blogs ', user.blogs)}
            </td>
            <td> {user.blogs !== undefined ? user.blogs.length : '0'  }</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users