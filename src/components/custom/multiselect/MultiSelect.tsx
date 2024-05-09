'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui-library/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui-library/command'
import { Command as CommandPrimitive } from 'cmdk'
import { Label } from '@/components/ui-library/label'
import { Select } from '@/types/generic'
import { sources } from '@/utils/constants/sources'

type Props = {
  name: string
  values: Select[]
  setValue: (items: Select[]) => void
}

const Multiselect = ({ name = '', values, setValue }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  // const [selected, setSelected] = React.useState<Select[]>([])
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback(
    (source: Select) => {
      const newValues = values.filter((s) => s.value !== source.value)
      setValue(newValues)
    },
    [values, setValue]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...values]
            newSelected.pop()
            setValue(newSelected)
          }
        }
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    []
  )

  const selectables = sources.filter((source) => !values.includes(source))

  return (
    <div className="flex flex-col items-start gap-2" data-testid={name}>
      <Label htmlFor={name.toLowerCase()} className="font-bold text-gray-900">
        {name}
      </Label>
      <Command
        id={name.toLowerCase()}
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group border-2 border-gray-300 px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {values.map((source) => {
              return (
                <Badge key={source.value} variant="secondary">
                  {source.label}
                  <button
                    role="button"
                    data-testid="remove button"
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(source)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(source)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}

            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select Sources..."
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandList>
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((source) => {
                    return (
                      <CommandItem
                        key={source.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          setInputValue('')
                          setValue([...values, source])
                        }}
                        className={'cursor-pointer'}
                      >
                        {source.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  )
}

export default Multiselect
