import React from 'react'


const PersonDetail = ({ personDetail }) => {
    return (
        <p>{personDetail.name} {personDetail.number}</p>
    )
}

export default PersonDetail