import { Input } from '@/components/ui-library/input'
import useDebounce from '@/hooks/useDebounce'
import React from 'react'

const Search = () => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(e.target.value)
    console.log(e.target.value)
  }
  const debounced = useDebounce(onSearch)

  return (
    <div className="mt-12">
      <Input
        type="search"
        onChange={debounced}
        placeholder="Search articles..."
        className="pl-8 w-full border-2 border-gray-300 h-14 placeholder:text-lg placeholder:text-gray-700 text-lg"
      />
    </div>
  )
}

export default Search
