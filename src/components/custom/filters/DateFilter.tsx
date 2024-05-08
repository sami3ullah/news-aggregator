import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui-library/button'
import { Calendar } from '@/components/ui-library/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui-library/popover'
import { Label } from '@/components/ui-library/label'
import usePostStore from '@/store/posts'

function DateFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const date = usePostStore((state) => state.filterPostDate)
  const setDate = usePostStore((state) => state.setFilterPostDate)

  return (
    <div className={cn('grid justify-items-start gap-2', className)}>
      <Label htmlFor="date" className="font-bold text-gray-900">
        Date
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateFilter
