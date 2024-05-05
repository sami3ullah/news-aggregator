import { Input } from '@/components/ui-library/input'

const Search = () => {
  return (
    <div className="mt-12">
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-8 w-full border-2 border-gray-300 h-14 placeholder:text-lg placeholder:text-gray-700"
      />
    </div>
  )
}

export default Search
