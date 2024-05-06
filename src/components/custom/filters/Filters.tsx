import { Button } from '@/components/ui-library/button'
import { Input } from '@/components/ui-library/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui-library/sheet'
import DateFilter from './DateFilter'
import { Label } from '@/components/ui-library/label'

const Filters = () => {
  return (
    <div className="mt-4 md:mt-8 self-end">
      {/* <SlidersHorizontal /> */}
      <Sheet>
        <SheetTrigger>
          <div className="font-bold underline">Filters Results</div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="gap-12">
            <SheetTitle>Choose your filters</SheetTitle>
            <SheetDescription className="mt-[40px] flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className="font-bold text-gray-900">
                  Category
                </Label>
                <Input
                  type="text"
                  id="category"
                  placeholder="Type your category"
                  className="pl-8 w-full border-2 border-gray-300 placeholder:text-gray-700"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="source" className="font-bold text-gray-900">
                  Source
                </Label>
                <Input
                  type="text"
                  id="source"
                  placeholder="BBC"
                  className="pl-8 w-full border-2 border-gray-300 placeholder:text-gray-700"
                />
              </div>
              {/* Date Filters */}
              <DateFilter />
              <Button>Filter Results</Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Filters
