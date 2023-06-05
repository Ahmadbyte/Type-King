import { useState, useEffect, useRef } from 'react'
import randomWords from 'random-words'
import './App.css';
import split from 'lodash/split'

const NUMB_OF_WORDS = 200


function App() {
  // const SECONDS = document.getElementById("inp2").value;
  // const UserInput = () => {
    const [inputValue, setInputValue] = useState();
    
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the input value, such as sending it to an API or processing it further
      console.log('Input value:', inputValue);
    };
    const SECONDS = 10;
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [currChar, setCurrChar] = useState("")
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const textInput = useRef(null)
  
  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  function start() {

    if (status === 'finished') {
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndex(-1)
      setCurrChar("")
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            setCurrInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        })
      }, 1000)
    }

  }

  function handleKeyDown({ keyCode, key }) {
    // space bar 
    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1);

    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success'
      } else {
        return 'has-background-danger'
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger'
    } else {
      return ''
    }
  }

//   function changeVal() {

//     var inp2 = document.getElementById("inp2");
//     let SECONDS = Number(inp2.value);
    
//     console.log("SECONDS: ", SECONDS);
//     // globe = num1 * num2;
//     // result.innerHTML += " The value of the global variable <b> globe </b> is changed from <b> " + prevGlobe + " </b> to <b> " + globe + " </b> the product of the two numbers <b> " + num1 + " * " + num2 + " </b> entered by you. <br> ";
//  }

  return (
    <div className="App" >
      <div className="is-size">
        Time Remaining:
        <br />
        {/* <input type = "number" id = "inp2" value='10' ></input>
        <button id = "btn" onclick = {changeVal()}>Click</button> */}
        <div>
      <form onSubmit={handleSubmit}>
        <label>
          {/* Enter a value: */}
          <input type="number" value={inputValue} onChange={handleChange} />
        </label>
        {/* <button type="submit" >Submit</button> */}
      </form>
    </div>
        {countDown}
      </div>
      {status === 'started' && (
        // <div className="section" >
        // <div className="card">
        // <div className="card-content">
        <div className="content">
          {words.map((word, i) => (
            <span key={i} >            
              {i === currWordIndex && (
                <span className='highlight'>                
                  {word.slice(0)}
                  <div className="highlight">
                  {split(word,'')[currCharIndex] && split(word, '')[currCharIndex]}                
                </div>
                </span>
              )}  
              <span >
                {word.split("").map((char, idx) => (
                  <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                ))}
              </span>
              <span> </span>
            </span>
          ))}
        </div>
      )}
      <input ref={textInput} disabled={status !== "started"} type="text" className="input" onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
      <br />
      <button className="button" onClick={start}>
        Start
      </button>
      <div id="keyboard">
        <div class="row">
          <div class="key">Q</div>
          <div class="key">W</div>
          <div class="key">E</div>
          <div class="key">R</div>
          <div class="key">T</div>
          <div class="key">Y</div>
          <div class="key">U</div>
          <div class="key">I</div>
          <div class="key">O</div>
          <div class="key">P</div>
        </div>
        <div class="row">
          <div class="key">A</div>
          <div class="key">S</div>
          <div class="key">D</div>
          <div class="key">F</div>
          <div class="key">G</div>
          <div class="key">H</div>
          <div class="key">J</div>
          <div class="key">K</div>
          <div class="key">L</div>
        </div>
        <div class="row">
          <div class="key">Z</div>
          <div class="key">X</div>
          <div class="key">C</div>
          <div class="key">V</div>
          <div class="key">B</div>
          <div class="key">N</div>
          <div class="key">M</div>
        </div>
      </div>

      {status === 'finished' && (
        <div className="columns">
          <p className="is-size-5">Words per minute:</p>
          <p className="is-size-1">
            {correct}
          </p>
          <p className="is-size-5">Accuracy:</p>
          {correct !== 0 ? (
            <p className="is-size-1">
              {Math.round((correct / (correct + incorrect)) * 100)}%
            </p>
          ) : (
            <p className="is-size-1">0%</p>
          )}
        </div>
      )}
      <span className="desc">Type King for Chaabi by:<br/>Sharique Ahmad</span>
    </div>
  );
}
export default App;