const industries=[
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Energy",
    "Automotive",
    "Telecommunications",
    "Consumer Goods",
    "Aerospace and Defense",
    "Media and Entertainment"
]
const presence=[
    "Remote",
    "Hybrid",
    "OnSite"
]
const position=[
    "Permanent",
    "Temporary",
    "Internship"
]
const time=[
    "Full-Time",
    "Part-Time"
]
const animation=[
    {width:"100vw"},
    {width:"100vw",top:'0'}
]
const timer={
    iterations:1,
    duration:300
}
const handleLogin=()=>{
    document.getElementById('login').animate(animation,timer)
    setTimeout(()=>{
        document.getElementById('login').style.width="100vw"  
        document.getElementById('login').style.top="0"  
    },280)
  }
module.exports={
    industries,
    position,
    time,
    presence,
    handleLogin,
    animation,
    timer
}