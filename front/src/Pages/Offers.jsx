import React, { useState,useEffect } from 'react'
import SearchBar from '../Components/SearchBar'
import Offer from '../Components/Offer'
import { presence } from '../Controllers/utils'

const Offers = () => {
  const [offers,setOffers]=useState({num:0,offers:[]});
  return (
    <section className='sec offers'>
      <SearchBar page="offers" setFunction={setOffers}/>
      <div className='resNum'>
        <p>Results : {offers.num}</p>
      </div>
      <div className='offerContainer'>
        {
          offers.num!==0?
          offers.offers.map((offer)=>{
            let date=new Date(offer.postDate)
            const dateToShow=`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
            return(
              <Offer
                infos={{
                  id:offer.id,
                  field:offer.field,
                  title:offer.title,
                  presence:offer.presence,
                  time:offer.time,
                  position:offer.position,
                  postDate:dateToShow,
                  num:offer.num
                }}
              />
            )
          })
          :<h1 className='noData'>No Offers For The Moment</h1>
        }
      </div>
    </section>
  )
}

export default Offers