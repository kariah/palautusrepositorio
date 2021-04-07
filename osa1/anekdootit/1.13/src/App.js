import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)




const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [selected, setSelected] = useState(0)
    const [anecdoteVotes, setAnecdoteVotes] = useState(Array(10).fill(0)) 

    const handleRandomAnecdoteClick = () => {

        let randomNumber = Math.floor(Math.random() * anecdotes.length)

        console.log(randomNumber)

        setSelected(randomNumber)
    }

    const voteClick = () => {  
        const newAnecdoteVotes = [...anecdoteVotes]

        // kasvatetaan taulukon paikan 2 arvoa yhdellä
        newAnecdoteVotes[selected] += 1

        console.log("b: ", selected, anecdoteVotes);
        console.log("b: ", selected, newAnecdoteVotes); 

        setAnecdoteVotes(newAnecdoteVotes); 
    }

    return (
        <>
            <div>
                {anecdotes[selected]} has {anecdoteVotes[selected]} votes
            </div>
            <div>
                <Button
                    handleClick={voteClick}
                    text='vote'
                />
                <Button
                    handleClick={handleRandomAnecdoteClick}
                    text='next anecdote'
                /> 
            </div>
        </>
    )
}

export default App