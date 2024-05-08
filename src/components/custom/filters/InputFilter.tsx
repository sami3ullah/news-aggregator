import { Input } from '@/components/ui-library/input'
import { Label } from '@/components/ui-library/label'
import useDebounce from '@/hooks/useDebounce'
import React, { useEffect, useState } from 'react'

type Props = {
  name?: string
  placeholder?: string
  value: string
  setValue: (text: string) => void
}

const InputFilter = ({
  name = '',
  placeholder = '',
  value,
  setValue,
}: Props) => {
  const [input, setInput] = useState('')

  const debounced = useDebounce((value: string) => {
    setValue(value)
  })

  const onSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    debounced(value)
  }

  useEffect(() => {
    setInput(value)
  }, [value])

  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={name.toLowerCase()} className="font-bold text-gray-900">
        {name}
      </Label>
      <Input
        type="text"
        id={name.toLowerCase()}
        placeholder={placeholder}
        value={input}
        onChange={onSourceChange}
        className="pl-4 w-full border-2 border-gray-300 text-primary"
      />
    </div>
  )
}

export default InputFilter
