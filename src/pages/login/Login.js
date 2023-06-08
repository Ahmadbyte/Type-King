import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

export default function Login ()  {
  
  return (

      <div className='app' >
        <span className='txt'>Type King
        <br />
        <h6 className='txt2'>Test your typing speed..</h6>
        </span>
        <button className='btn' >
        <Link to="/start" style={{ textDecoration: "none" }}>Start the Test</Link>
        </button>
      </div>

  );
};


