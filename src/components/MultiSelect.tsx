import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Selecione...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 font-normal hover:bg-transparent px-3 py-2"
        >
          <div className="flex flex-wrap gap-1 items-center">
            {selected.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="mr-1 mb-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleUnselect(item)
                }}
              >
                {item}
                <X className="ml-1 h-3 w-3 hover:text-destructive transition-colors" />
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option)
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      onChange(
                        isSelected ? selected.filter((i) => i !== option) : [...selected, option],
                      )
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    {option}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
