import React from 'react'
// import _, {  } from 'lodash'

const Users = ({ users }) => {

  console.log('users (Users) ', users)

  //Testing
  // const result = _(blogs)
  //   .groupBy('author')
  //   .map((author, id) => ({
  //     author: id,
  //     blogCount: _.countBy(author, 'author')
  //   }))
  //   .value()

  // console.log(result)

  if (users === null)
  {
    return <></>
  }

  // if (users === undefined || users === null || users.blogs === undefined || users.blogs.length === 0)
  // {
  //   return <></>
  // }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><b>Blogs created</b></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><a href={`/users/${user.id}`}>{user.name}</a>
              </td>
              <td> {user.blogs !== undefined ? user.blogs.length : '0'  }</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users