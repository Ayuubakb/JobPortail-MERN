import React from 'react'

const Input = ({name,placeholder,inputs,setInputs,type,value}) => {
  return (
    <div className='input'>
        <label>{placeholder} :</label>
        <input
            name={name}
            type={type}
            placeholder={placeholder+"..."}
            value={!value?inputs.name:value}
            onChange={(e)=>{setInputs((i)=>{return {...i,[name]:e.target.value}})}}
        />
    </div>  
  )
}

export default Input