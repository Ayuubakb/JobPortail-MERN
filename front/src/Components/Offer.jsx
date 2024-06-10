import React from 'react'

const Offer = ({infos}) => {
  return (
    <div className='offer'>
        <div className='infos'>
            <p>{infos.field}</p>
            <h1>{infos.title}</h1>
            <div className='tags'>
                <p>{infos.presence}</p>
                <p>{infos.time}</p>
                <p>{infos.position}</p>
            </div>
        </div>
        <div className='numAndDate'>
            <div>
                <p>Posted : {infos.postDate}</p>
            </div>
            <div>
                <p>Applications: {infos.num}</p>
            </div>
        </div>
    </div>
  )
}

export default Offer