import { useState } from 'react'

const useField = (type, label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    label,
    type,
    value,
    onChange
  }
}

export { useField }