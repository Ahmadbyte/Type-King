import React from 'react';
import { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';
import './type.css'

const NUMB_OF_WORDS = 120

function Type() {

  const [words, setWords] = useState([])
  const [SECONDS, setSECONDS] = useState()
  const [countDown, setCountDown] = useState()
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  const textInput = useRef(null)
  const [match, setMatch] = useState(false);
  const [wordCorrect, setWordCorrect] = useState("");

  useEffect(() => {
    setWords(generateWords())
  }, [])

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  const handleTimingSelection = (event) => {
    event.preventDefault();
    const timing = document.getElementById('num').value;
    setSECONDS(timing);
    setCountDown(timing);
  };

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
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown <= 0) {
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

  const stop = () => {
    setStatus('finished')
    setCurrInput("")
    setCountDown(0);
  };

  function handleKeyDown({ keyCode }) {

    if (keyCode === 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currWordIndex + 1)
      setCurrCharIndex(-1)

    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
    } else {
      setCurrCharIndex(currCharIndex + 1)
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex]
    const doesItMatch = wordToCompare === currInput.trim()
    if (doesItMatch) {
      setCorrect(correct + 1);
      setMatch(true);
      setWordCorrect("Correct");

    }
    else {
      setIncorrect(incorrect + 1);
      setMatch(false);
      setWordCorrect("Incorrect");
    }
  }
  function keyHighlight(event) {

    const currKey = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(currKey);

    if (currKey >= 'a' && currKey <= 'z') {
      const keys = document.querySelectorAll(".key");
      keys.forEach(key => { key.style.backgroundColor = "#9DB2BF"; });
      const k = document.getElementById(currKey);
      k.style.backgroundColor = "#F5F5F5";

      setTimeout(() => {
        k.style.backgroundColor = "#9DB2BF";
      }, 1000);

    }

  }

  function handleEvent(event) {
    handleKeyDown(event);
    keyHighlight(event);
  }

  return (
    <div className="App" >
      <div className="is-size">
        <span>Time Remaining</span>
        <br />
        {countDown}
      </div>
      <div id='timeSelect' >
        <label className='clr'>Select Time: </label>
        <form onChange={handleTimingSelection}>
          <select className='clr1' id='num' >
            <option>select</option>
            <option value='10'>10 sec</option>
            <option value='30'>30 sec</option>
            <option value='60'>1 min</option>
            <option value='120'>2 min</option>
            <option value='180'>3 min</option>
            <option value='300'>5 min</option>
          </select>
        </form>
      </div>

      <div className="is-size" style={{ color: match ? 'green' : 'red' }}>
        {wordCorrect}
      </div>
      {status === 'started' && (
        <div className="content">
          {words.map((word, i) => (
            <span key={i} >
              <span >
                {word.split("").map((char, idx) => (
                  <span className={(i, idx, char)} key={idx} >{char}</span>
                ))}
                {i === currWordIndex && (
                  <span >
                    <div className='highlight'>
                      {word}
                    </div>
                  </span>
                )}
              </span>
              <span> </span>
            </span>
          ))}
        </div>
      )}
      <input ref={textInput} disabled={status !== "started"} type="text" className="input" onKeyDownCapture={handleEvent} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
      <br />
      <div id="keyboard">
        <div class="row">
          <div class="key q" id='q'>Q</div>
          <div class="key w" id='w'>W</div>
          <div class="key e" id='e'>E</div>
          <div class="key r" id='r'>R</div>
          <div class="key t" id='t'>T</div>
          <div class="key y" id='y'>Y</div>
          <div class="key u" id='u'>U</div>
          <div class="key i" id='i'>I</div>
          <div class="key o" id='o'>O</div>
          <div class="key p" id='p'>P</div>
        </div>
        <div class="row">
          <div class="key a" id='a'>A</div>
          <div class="key s" id='s'>S</div>
          <div class="key d" id='d'>D</div>
          <div class="key f" id='f'>F</div>
          <div class="key g" id='g'>G</div>
          <div class="key h" id='h'>H</div>
          <div class="key j" id='j'>J</div>
          <div class="key k" id='k'>K</div>
          <div class="key l" id='l'> L</div>
        </div>
        <div class="row">
          <div class="key z" id='z'>Z</div>
          <div class="key x" id='x'>X</div>
          <div class="key c" id='c'>C</div>
          <div class="key v" id='v'>V</div>
          <div class="key b" id='b'>B</div>
          <div class="key n" id='n'>N</div>
          <div class="key m" id='m'>M</div>
        </div>
      </div>
      <button className="button" onClick={start}>
        Start
      </button>
      <button className="button" onClick={stop}>
        Stop
      </button>
      {status === 'finished' && (
        <div className="columns">
          <p className="is-size-5">Words per minute:</p>
          <p className="is-size-1">
            {correct}
          </p>
          {correct <= 10 ? (<span className='text'>You can do better!</span>) : (<span className='text' >You are a Pro!</span>)}
          <br />
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
      <span className="desc"><br />Type King for Chaabi by:<br />Sharique Ahmad</span>
    </div>
  );
}
export default Type;