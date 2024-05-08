import { Input } from '@/components/ui-library/input'
import useDebounce from '@/hooks/useDebounce'
import usePostStore from '@/store/posts'
import React from 'react'

const Search = () => {
  const { setSearchQuery } = usePostStore()

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const debounced = useDebounce(onSearch, 1000)

  return (
    <div className="mt-12">
      <Input
        type="search"
        onChange={debounced}
        placeholder="Search articles..."
        className="pl-8 w-full border-2 border-gray-300 h-14 placeholder:text-md md:placeholder:text-lg text-lg"
      />
    </div>
  )
}

export default Search
