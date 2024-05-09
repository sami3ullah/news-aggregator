import { Input } from '@/components/ui-library/input'
import useDebounce from '@/hooks/useDebounce'
import usePostStore from '@/store/posts'
import React, { useState, useEffect } from 'react'

const Search = () => {
  const searchQuery = usePostStore((state) => state.searchQuery)
  const setSearchQuery = usePostStore((state) => state.setSearchQuery)
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounce the setSearchQuery function
  const debounced = useDebounce((value: string) => {
    setSearchQuery(value)
  })

  // Update inputValue when searchQuery changes elsewhere
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debounced(value)
  }

  return (
    <div className="mt-12">
      <Input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search articles..."
        className="pl-8 w-full border-2 border-gray-300 h-12 md:h-14 placeholder:text-md md:placeholder:text-lg text-lg"
      />
    </div>
  )
}

export default Search
