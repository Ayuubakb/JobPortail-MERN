import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { checkExists, signup } from '../Controllers/authControllers'
import { industries } from '../Controllers/utils'

const Signup = () => {
    const [inputs,setInputs]=useState({login:"",password:"",emailReceive:""})
    const [companyValues,setCompanyValues]=useState({companyName:"",field:"",location:"",numEmployees:null})
    const [jobValues,setJobValues]=useState({firstName:"",lastName:"",number:"",field:""})
    const [err,setErr]=useState("")
    const [choice,setChoice]=useState({target:"",notTarget:""})
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(inputs.emailReceive);
        if(inputs.emailReceive!=="")
            choice.target==="company"? signup({...inputs,...companyValues},setErr): signup({...inputs,...jobValues},setErr)
    }
    const handleRadio=()=>{
        if(document.getElementById("yesRadio").checked)
            setInputs((i)=>{return {...i,["emailReceive"]:true}})
        else
            setInputs((i)=>{return {...i,["emailReceive"]:false}})   
    }
    const animation=[
        {transform:"translateX(0%)"},
        {transform:"translateX(-100%)"}
    ]
    const animation2=[
        {transform:"translateX(-100%)"},
        {transform:"translateX(-200%)"}
    ]
    const timer={
        iterations:1,
        duration:300
    }
    const slideTo2=(tmp)=>{
        tmp==="company"?setChoice({target:"company",notTarget:"job"}):setChoice({target:"job",notTarget:"company"})
        const regex=new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        if(inputs.login!=="" && inputs.password!=="" && regex.test(inputs.login)){
            checkExists(inputs,setErr)
        }
    }
    const handleCompany=()=>{
        slideTo2("company")
    }
    const handleJob=()=>{
        slideTo2("job")
    }
    const handleContinue=()=>{
        if((choice.target==="job" && jobValues.lastName!=="" && jobValues.firstName!=="" && jobValues.field!=="" && jobValues.number!=="")
            || (choice.target==="company" && companyValues.companyName!=="" && companyValues.field!=="" && companyValues.location!=="" && companyValues.numEmpl!==null)){
            document.getElementById(choice.target).animate(animation2,timer)
            document.getElementById("last").animate(animation2,timer)
            setTimeout(()=>{
                document.getElementById(choice.target).style.transform="translateX(-200%)"
                document.getElementById("last").style.transform="translateX(-200%)"
                document.getElementById("line2").style.backgroundColor="#DC5F00"
                document.getElementById("num3").style.backgroundColor="#DC5F00"
            },290)
        }
    }
    useEffect(()=>{
        if(err==='Continue'){
            document.getElementById(choice.notTarget).style.display="none"
            document.getElementById("general").animate(animation,timer)
            document.getElementById(choice.target).animate(animation,timer)
            setTimeout(()=>{
                document.getElementById("general").style.transform="translateX(-100%)"
                document.getElementById(choice.target).style.transform="translateX(-100%)"
                document.getElementById("line1").style.backgroundColor="#DC5F00"
                document.getElementById("num2").style.backgroundColor="#DC5F00"
            },290)
        }
    },[err])
    
  return (
    <section className='sec signup'>
        <div className='signupCon'>
            <h1>SignUp</h1>
            <div className='processBar'>
                <div className='num' id='num1'><i class="fa-solid fa-lg fa-1"></i></div><div className='line' id="line1"></div><div className='num' id='num2'><i class="fa-solid fa-lg fa-2"></i></div><div className='line' id='line2'></div><div className='num' id='num3'><i class="fa-solid fa-lg fa-3"></i></div>
            </div>
            <p className='err'>{err!=="Continue"?err:""}</p>
            <form onSubmit={handleSubmit}>
                <div className='general' id="general">
                    <Input
                        name="login"
                        type="email"
                        placeholder="Email"
                        inputs={inputs}
                        setInputs={setInputs}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        inputs={inputs}
                        setInputs={setInputs}
                    />
                    <p>You are ?</p>
                    <div className='buttons'>
                        <button onClick={handleCompany}>Company</button>
                        <button onClick={handleJob}>Job Seeker</button>
                    </div>
                </div>
                <div className='company' id='company'>
                    <Input
                        name="companyName"
                        type="text"
                        placeholder="Company's Name"
                        inputs={companyValues}
                        setInputs={setCompanyValues}
                    />
                    <Input
                        name="location"
                        type="text"
                        placeholder="Location"
                        inputs={companyValues}
                        setInputs={setCompanyValues}
                    />
                    <div className='selIn'>
                        <label>Field Of Interest : </label>
                        <select name='field' onChange={(e)=>{setCompanyValues((i)=>{return {...i,[e.target.name]:e.target.value}})}}>
                            <option value="">Select An Industry</option>
                            {
                                industries.map((industrie)=>{
                                    return(
                                        <option value={industrie}>{industrie}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Input
                        name="numEmployees"
                        type="num"
                        placeholder="Number of Employees(~App)"
                        inputs={companyValues}
                        setInputs={setCompanyValues}
                    />
                    <div className='buttons'>
                        <button onClick={handleContinue}>Continue</button>
                    </div>
                </div>
                <div className='job' id="job">
                    <Input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        inputs={jobValues}
                        setInputs={setJobValues}
                    />
                    <Input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        inputs={jobValues}
                        setInputs={setJobValues}
                    />
                    <div className='selIn'>
                        <label>Field Of Interest : </label>
                        <select name='field' onChange={(e)=>{setJobValues((i)=>{return {...i,[e.target.name]:e.target.value}})}}>
                            <option value="">Select An Industry</option>
                            {
                                industries.map((industrie)=>{
                                    return(
                                        <option value={industrie}>{industrie}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Input
                        name="number"
                        type="text"
                        placeholder="Phone Number"
                        inputs={jobValues}
                        setInputs={setJobValues}
                    />
                    <div className='buttons'>
                        <button onClick={handleContinue}>Continue</button>
                    </div>
                </div>
                <div className='last' id="last">
                    <h2>Do You Agree to Receive Emails from our part?</h2>
                    <div className='top'>
                        <label>
                            <input 
                                type='radio'
                                name='emailReceive'
                                value="Yes"
                                onChange={handleRadio}
                                id="yesRadio"
                            />
                            Yes
                        </label>
                        <label>
                            <input 
                                type='radio'
                                name='emailReceive'
                                value="No"
                                onChange={handleRadio}
                                id="noRadio"
                            />
                            No
                        </label>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Signup