import React from 'react'
import SearchBar from '../Components/SearchBar'
import Offer from '../Components/Offer'
import { presence } from '../Controllers/utils'

const Offers = () => {
  return (
    <section className='sec offers'>
      <SearchBar/>
      <div className='resNum'>
        <p>Results : 7</p>
      </div>
      <div className='offerContainer'>
        <Offer
          infos={{
            field:"Technology",
            title:"Full-stack developper Internship",
            presence:"Hybrid",
            time:"Full-Time",
            position:"Internship",
            postDate:"5/06/2024",
            num:5
          }}
        />
        <Offer
          infos={{
            field:"Technology",
            title:"Full-stack developper Internship",
            presence:"Hybrid",
            time:"Full-Time",
            position:"Internship",
            postDate:"5/06/2024",
            num:5
          }}
        />
        <Offer
          infos={{
            field:"Technology",
            title:"Full-stack developper Internship",
            presence:"Hybrid",
            time:"Full-Time",
            position:"Internship",
            postDate:"5/06/2024",
            num:5
          }}
        />
        <Offer
          infos={{
            field:"Technology",
            title:"Full-stack developper Internship",
            presence:"Hybrid",
            time:"Full-Time",
            position:"Internship",
            postDate:"5/06/2024",
            num:5
          }}
        />
        <Offer
          infos={{
            field:"Technology",
            title:"Full-stack developper Internship",
            presence:"Hybrid",
            time:"Full-Time",
            position:"Internship",
            postDate:"5/06/2024",
            num:5
          }}
        />
      </div>
    </section>
  )
}

export default Offers