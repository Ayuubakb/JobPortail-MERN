import React from 'react'

const Input = ({name,placeholder,inputs,setInputs,type}) => {
  return (
    <div className='input'>
        <label>{placeholder} :</label>
        <input
            name={name}
            type={type}
            placeholder={placeholder+"..."}
            value={inputs.name}
            onChange={(e)=>{setInputs((i)=>{return {...i,[name]:e.target.value}})}}
        />
    </div>  
  )
}

export default Input