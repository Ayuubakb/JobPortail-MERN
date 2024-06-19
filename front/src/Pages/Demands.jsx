import React , {useState} from 'react'
import SideBar from '../Components/SideBar'
import Application from '../Components/Application'

const Demands = () => {
  const [demands,setDemands]=useState({distanct:[],arr:[]})
  return (
    <section className='sec demands'>
      <SideBar demands={demands} setDemands={setDemands}/>
        <div className='demandsContainer'>
          <p className='resu'>Result : {demands.arr.length} Applications</p>
          <div className='holder'>
          {
            demands.arr.length!==0?
            demands.arr.map((a)=>{
              return(
                <Application
                  idUser={a.idUser}
                  IdOffer={a.IdOffer}
                  field={a.field}
                  title={a.title}
                  appDate={a.appDate}
                  status={a.status}
                  interviewDate={a.interviewDate}
                  firstName={a.firstName}
                  lastName={a.lastName}
                  idDemand={a.idDemand}
                />
              )
            }):<h1 className='noData'>No Applications</h1>
          }
          </div>
        </div>
    </section>
  )
}

export default Demands