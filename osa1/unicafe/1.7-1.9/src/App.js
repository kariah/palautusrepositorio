import React, { useState } from 'react'

const Statistics = (props) => {
    console.log(props.all);
    if (props.all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>statistics</h2> 
            <div>
                <p>good: {props.good}</p>
                <p>neutral: {props.neutral}</p>
                <p>bad: {props.bad}</p>
                <p>all: {props.all}</p>
                <p>average: {props.averagePercent}</p>
                <p>positive: {props.positivePercent}</p>
            </div>
        </div>
    )
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.pageTitle}</h1>
        </div>
    )
}


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


const App = () => {
    const pageTitle = 'give feedback'

    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [sum, setSum] = useState(0)
    const [positive, setPositive] = useState(0) 

    const calculatePercentage = (partialValue, totalValue) => {
        if (totalValue <= 0) {
            return (
                0
            )
        } 

        const percentage = (100 * partialValue) / totalValue;  
        return percentage; 
    }


    const calculateAverage = (partialValue, totalValue) => {
        if (totalValue <= 0) {
            return (
                0
            )
        }

        const calculatedAverage = partialValue / totalValue
        return calculatedAverage; 
    }
 

    const handleGoodClick = () => { 
        setGood(good + 1)
        setAll(all + 1)
        setSum(sum + 1)
        setPositive(positive + 1)
    }

    const handleNeutralClick = () => { 
        setAll(all + 1)
        setNeutral(neutral + 1)
    }


    const handleBadClick = () => { 
        setBad(bad + 1)
        setAll(all + 1)
        setSum(sum - 1)
    } 

    return (
        <>

            <Header pageTitle={pageTitle} />
            <div>
                <div>
                    <Button handleClick={handleGoodClick} text='good' />
                    <Button handleClick={handleNeutralClick} text='neutral' />
                    <Button handleClick={handleBadClick} text='bad' />
                    <Statistics good={good} neutral={neutral} bad={bad} all={all} averagePercent={calculateAverage(sum, all)} positivePercent={calculatePercentage(positive, all)} />
                </div>
            </div>
        </>
    )
}

export default App