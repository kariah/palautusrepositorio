import React from 'react'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {

  console.log('users (Users) ', users)

  if (users === null)
  {
    return <></>
  }

  return (
    <div>
      <Table striped bordered hover variant="dark" responsive>
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
      </Table>
    </div>
  )
}

export default Users