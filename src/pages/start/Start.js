import React from 'react';
import { Link } from 'react-router-dom';
import './start.css'

export default function Login ()  {
  
  return (

      <div className='app' >
        <div className='logo'></div>
        <span className='txt'>Type King
        <br />
        <h6 className='txt2'>Test your typing speed..</h6>
        <Link to="/type" style={{ textDecoration: "none" }}>
        <button className='btn' >
        <>Start the Test</>
        </button>
        </Link>
        </span>
        
      </div>

  );
};


