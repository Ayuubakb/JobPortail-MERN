import React from 'react'

const FeaturesCard = ({title,desc}) => {
    const handleMouseOn=()=>{
        document.getElementById(title+"face1").animate(animation,timer)
        document.getElementById(title+"face2").animate(animation,timer)
        setTimeout(()=>{
            document.getElementById(title+"face1").style.transform="translateX(-100%)"
            document.getElementById(title+"face2").style.transform="translateX(-100%)"
        },290)
    }
    const handleMouseOut=()=>{
        document.getElementById(title+"face1").animate(animation2,timer)
        document.getElementById(title+"face2").animate(animation2,timer)
        setTimeout(()=>{
            document.getElementById(title+"face1").style.transform="translateX(0%)"
            document.getElementById(title+"face2").style.transform="translateX(0%)"
        },290)
    }
    const animation=[
        {transform:"translateX(0%)"},
        {transform:"translateX(-100%)"}
    ]
    const animation2=[
        {transform:"translateX(-100%)"},
        {transform:"translateX(0%)"}
    ]
    const timer={
        iterations:1,
        duration:300
    }
  return (
    <div className='featuresCard' onMouseEnter={handleMouseOn} onMouseLeave={handleMouseOut}>
        <div className='face1' id={`${title}face1`}>
            <h1>{title}</h1>
        </div>
        <div className='face2' id={`${title}face2`}>
            <p>{desc}</p>
        </div>
    </div>
  )
}

export default FeaturesCard