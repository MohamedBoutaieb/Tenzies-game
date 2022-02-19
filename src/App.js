import React from "react"
import Die from "./components/Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import ScoreBoard from "./components/ScoreBoard.js"
//import useWindowSize from './useWindowSize'
import "./index.css" 
export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [score,setScore ]= React.useState(0);
    const [time,setTime] = React.useState(Math.floor(new Date().getTime()/1000))
    const [input,setInput] = React.useState("")
    const [submission,setSubmission] = React.useState(true)

   React.useState(()=>{
     if (localStorage.getItem("scores")===null)
    localStorage.setItem("scores",JSON.stringify([]));},[]);
   function win(){
    let tab = JSON.parse(localStorage.getItem("scores"));
   
    if (tab.length<5){
      tab.push({name: input,value : score  })
    }
    else{
      tab[0] ={name: input,value : score  };
    }
    localStorage.setItem("scores",JSON.stringify(tab));
    setSubmission(true);
   } 
    
    
   React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    React.useEffect(
       ()=> { if (tenzies) setScore((s)=>s+(Math.floor(new Date().getTime()/1000)-time)) }
      , [tenzies] )
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function addScore(){
      setScore((s)=>s+1)
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function newGame(){
        
        setScore(0);
        setDice(allNewDice());
        setTenzies(false);
        setTime(Math.floor(new Date().getTime()/1000));
        setInput("");
        setSubmission(true);
    }
    function rollDice() {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            addScore();
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    function handleChange(event) {
    
       setInput(event.target.value)
    }
    function handleSubmit(event){ 
      win();
      setInput("");
      setSubmission(false);
      event.preventDefault();
    }
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti  className="confetti" />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={tenzies? newGame :rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
               {tenzies && <div className="msg"><div>Congratulations! you won , your Score is : </div> 
               <div className="score">{score} </div>
               <br></br>
               <div>submit your score to join the leaderboard</div> </div>}  
               {(submission && tenzies) && <div><div className="form">
               <form onSubmit={handleSubmit} method="get" > 
               <div class="form-example">
                <br></br>
              <label for="name">Enter your name: </label>
              <input type="text" name="name" value={input} onChange={handleChange} id="name" required/>
              <br></br>
               <button className="submission"> Submit </button>
                   </div>

              </form>
               </div> 
            
               </div>
               } 
               {tenzies && <ScoreBoard/>}
        </main>
    )
}