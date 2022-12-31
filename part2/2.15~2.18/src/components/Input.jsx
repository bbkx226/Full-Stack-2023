import React from 'react'

const Input = ({text, value, onChange, onInput}) => {
  return (
    <div>
        {text}: <input value={value} onChange={onChange} onInput={onInput}></input>
    </div>
  )
}

export default Input