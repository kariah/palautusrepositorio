import React, { useState } from 'react'

const Statistics = (props) => { 
    //if (props.allClicks.length === 0) {
    //    return (
    //        <div>
    //            the app is used by pressing the buttons
    //        </div>
    //    )
    //}

    return (
        <div>
            <h2>statistics</h2>
            <div>
                <p>good: {props.good}</p>
                <p>neutral: {props.neutral}</p>
                <p>bad: {props.bad}</p> 
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
     
    const [allClicks, setAll] = useState([])


    console.log('allClicks', allClicks.good)  
   
    const handleGoodClick = () => {
    /* setAll(allClicks.concat('L' + good))*/
         setAll(allClicks.concat('L' + good))  
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        /*setAll(allClicks.concat('L'))*/
        setNeutral(neutral + 1)
    }


    const handleBadClick = () => {
        /*setAll(allClicks.concat('L'))*/
        setBad(bad + 1)
    } 

    return (
        <>
            <Header pageTitle={pageTitle} />
            <div>
                <div> 
                    <Button handleClick={handleGoodClick} text='good' />
                    <Button handleClick={handleNeutralClick} text='neutral' />
                    <Button handleClick={handleBadClick} text='bad' /> 
                    <Statistics good={good} neutral={neutral} bad={bad}/>
                </div>
            </div>
        </>
    )
}

export default App
