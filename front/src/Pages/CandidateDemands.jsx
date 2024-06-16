import React, { useEffect, useState } from 'react'
import Application from '../Components/Application'
import { candidateGetNoId } from '../Controllers/candidateControllers'


const CandidateDemands = () => {
  const [applications,setApplications]=useState({accepted:[],refused:[],pending:[]})
  useEffect(()=>{
    candidateGetNoId("applications",setApplications)
  },[])
  console.log(applications);
  return (
    <section className='sec canDemands'>
      <div className='accepted'>
        <h1>Accepted Applications : </h1>
        <div className='container'>
          {
            applications.accepted.length!==0?
            applications.accepted.map((acc)=>{
              return(
                <Application
                  IdOffer={acc.IdOffer}
                  field={acc.field}
                  companyName={acc.companyName}
                  title={acc.title}
                  appDate={acc.appDate}
                  status={acc.status}
                  interviewDate={acc.interviewDate}
                />
              )
            }):<p className="noData">No Applications</p>
          }
        </div>
      </div>
      <div className='refusedAndWaiting'>
        <div className='waiting'>
          <h1>Pending Applications : </h1>
          {
            applications.pending.length!==0?
            applications.pending.map((acc)=>{
              return(
                <Application
                  IdOffer={acc.IdOffer}
                  field={acc.field}
                  companyName={acc.companyName}
                  title={acc.title}
                  appDate={acc.appDate}
                  status={acc.status}
                  interviewDate={acc.interviewDate}
                />
              )
            }):<p className="noData">No Applications</p>
          }
        </div>
        <div className='refused'>
           <h1>Refused Applications : </h1>
          {
            applications.refused.length!==0?
            applications.refused.map((acc)=>{
              return(
                <Application
                  IdOffer={acc.IdOffer}
                  field={acc.field}
                  companyName={acc.companyName}
                  title={acc.title}
                  appDate={acc.appDate}
                  status={acc.status}
                  interviewDate={acc.interviewDate}
                />
              )
            }):<p className="noData">No Applications</p>
          }
        </div>
      </div>
    </section>
  )
}

export default CandidateDemands