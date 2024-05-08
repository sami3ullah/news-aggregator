import { Button } from '@/components/ui-library/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui-library/sheet'
import DateFilter from './DateFilter'
import SourceFilter from './SourceFilter'
import usePostStore from '@/store/posts'
import React from 'react'
import { X } from 'lucide-react'
import InputFilter from './InputFilter'

const Filters = () => {
  const appliedPostFilters = usePostStore((state) => state.appliedPostFilters)
  const filterPostCategory = usePostStore((state) => state.filterPostCategory)
  const { clearFilters, setAppliedPostFilters, setFilterPostCategory } =
    usePostStore()
  const [open, setOpen] = React.useState(false)

  const onClickHandler = () => {
    setAppliedPostFilters()
    setOpen(false)
  }

  return (
    <div className="mt-1 md:mt-8 self-end flex items-center">
      {!!appliedPostFilters && (
        <Button
          variant="link"
          onClick={clearFilters}
          className="font-bold text-md text-neutral-500"
        >
          <X size={17} className="mr-1" /> Clear Filters
        </Button>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="font-bold underline">Filters Results</div>
        </SheetTrigger>
        <SheetContent className="w-full md:w-[400px] overflow-y-auto">
          <SheetHeader className="gap-12">
            <SheetTitle className="text-left text-[1.5rem]">
              Choose your filters
            </SheetTitle>
            <div className="mt-[40px] flex flex-col gap-12">
              <InputFilter
                value={filterPostCategory}
                setValue={setFilterPostCategory}
                name="Category"
                placeholder="Sports"
              />
              <SourceFilter />
              <DateFilter />
              <Button type="submit" onClick={onClickHandler}>
                Filter Results
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Filters
