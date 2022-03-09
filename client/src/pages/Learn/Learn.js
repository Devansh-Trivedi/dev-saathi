import React from 'react';
import './learn.css';

const Learn = () => {
  return (
      <>
        <h2><span>LEARN MERN</span></h2> <br /><br />
        <div style={{textAlign: 'center', width: '100%'}}>
            <button> MONGO DB
                <span></span>
            </button> 
            <button> EXPRESS
                <span></span>
            </button> 
            <button> REACT JS
                <span></span>
            </button> 
            <button> NODE JS
                <span></span>
            </button> 
        </div> <br /> <br /> <br />
        <h2><span>LEARN DJANGO</span></h2> <br /><br />
        <div className='django'>
            <button> DJANGO
                <span></span>
            </button> 
            <button> PYTHON
                <span></span>
            </button> 
            <button> SQL
                <span></span>
            </button> 
            
        </div>
      </>
    

  )
}

export default Learn