import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const MostVotesAnecdoteDisplay = (props) => {
    let maxVotesValue = Math.max.apply(this, props.anecdoteVotes)
    let index = props.anecdoteVotes.indexOf(maxVotesValue)
    let mostVotedAnecdote = props.anecdotes[index]

    if (maxVotesValue === 0) {
        return (
            <div>
                <p>No votes given</p>
            </div>
        )
    }

    return (
        <div>  
            {mostVotedAnecdote} has {maxVotesValue} vote(s) 
        </div>
    )
}



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
     

    //let maxVotesValue = Math.max.apply(this, anecdoteVotes)
    //let index = anecdoteVotes.indexOf(maxVotesValue)
    //console.log("max ", maxVotesValue)
    //console.log("index of max", index)
    //console.log(anecdotes[index])

    return (
        <>
            <div>
                <h1>Anecdote of the day</h1>
            </div>
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
            <div>
                {anecdotes[selected]} has {anecdoteVotes[selected]} votes
            </div>
            <div>
                <h2>Anecdote with most votes</h2>
            </div>
            <div>
                <MostVotesAnecdoteDisplay anecdoteVotes={anecdoteVotes} anecdotes={anecdotes} />
            </div>

        </>
    )
}

export default App