import { Input } from '@/components/ui-library/input'
import { Label } from '@/components/ui-library/label'
import useDebounce from '@/hooks/useDebounce'
import usePostStore from '@/store/posts'
import React from 'react'

const CategoryFilter = () => {
  const setFilterPostCategory = usePostStore(
    (state) => state.setFilterPostCategory
  )

  const onSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPostCategory(e.target.value)
  }
  const debounced = useDebounce(onSourceChange, 1000)
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="category" className="font-bold text-gray-900">
        Category
      </Label>
      <Input
        type="text"
        id="category"
        placeholder="Football"
        onChange={debounced}
        className="pl-8 w-full border-2 border-gray-300 text-primary"
      />
    </div>
  )
}

export default CategoryFilter
