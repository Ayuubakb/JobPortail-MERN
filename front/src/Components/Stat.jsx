import React from 'react'

const Stat = ({title,num,color}) => {
  return (
    <div className='stat'>
        <div className='num'>
            <h1>{num}</h1>
        </div>
        <div className='title' style={{backgroundColor:color}}>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default Stat