import { Input } from '@/components/ui-library/input'
import { Label } from '@/components/ui-library/label'
import useDebounce from '@/hooks/useDebounce'
import usePostStore from '@/store/posts'
import React from 'react'

const SourceFilter = () => {
  const setFilterPostSource = usePostStore((state) => state.setFilterPostSource)

  const onSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPostSource(e.target.value)
  }
  const debounced = useDebounce(onSourceChange, 1000)
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="source" className="font-bold text-gray-900">
        Source
      </Label>
      <Input
        type="text"
        id="source"
        placeholder="The New York Times"
        onChange={debounced}
        className="pl-8 w-full border-2 border-gray-300 placeholder:text-gray-700"
      />
    </div>
  )
}

export default SourceFilter
