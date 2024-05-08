import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui-library/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui-library/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui-library/popover'
import { CommandList } from 'cmdk'
import { sources } from '@/utils/constants/sources'
import { Label } from '@/components/ui-library/label'
import usePostStore from '@/store/posts'

const SourceFilter = () => {
  const [open, setOpen] = React.useState(false)
  const setFilterPostSource = usePostStore((state) => state.setFilterPostSource)
  const filterPostSource = usePostStore((state) => state.filterPostSource)

  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor="source" className="font-bold text-gray-900">
        Source
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            id="source"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {filterPostSource ? (
              sources?.find((sources) => sources?.value === filterPostSource)
                ?.label
            ) : (
              <span className="text-gray-500">Select a source...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search sources..." />
            <CommandEmpty>No source found.</CommandEmpty>
            <CommandList className="max-h-[200px] w-[244px] md:w-[334px] overflow-y-auto">
              <CommandGroup>
                {sources?.map((sources) => (
                  <CommandItem
                    key={sources?.value}
                    value={sources?.value}
                    onSelect={(currentValue) => {
                      setFilterPostSource(
                        currentValue === filterPostSource ? '' : currentValue
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        filterPostSource === sources?.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {sources?.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SourceFilter
