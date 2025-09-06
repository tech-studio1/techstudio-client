'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import dhaka_data from '@/utils/dhaka.json';

type SelectFormProps = {
  label: string;
  name: string;
  options: Array<any>; // Not used anymore, but keeping for compatibility
  districtSelectValue: string | null; // Not used anymore, but keeping for compatibility
  cityIdFieldName?: string;
};

const AreaSelectForm: React.FC<SelectFormProps> = ({
  label,
  name,
  options, // Unused but kept for compatibility
  districtSelectValue, // Unused but kept for compatibility
  cityIdFieldName,
}) => {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [displayedOptions, setDisplayedOptions] = useState<any[]>([]);

  // Only use Dhaka data since this component is only for Dhaka areas
  const optionsData = useMemo(() => {
    return dhaka_data.data;
  }, []);

  // Sync displayedOptions with optionsData
  useEffect(() => {
    if (inputValue === '') {
      setDisplayedOptions(optionsData);
    }
  }, [optionsData, inputValue]);

  const handleInputChange = useCallback(
    (inputValue: string) => {
      setInputValue(inputValue);

      if (inputValue === '') {
        setDisplayedOptions(optionsData);
      } else {
        const filteredOptions = optionsData.filter((option) =>
          option.name?.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setDisplayedOptions(filteredOptions);
      }
    },
    [optionsData],
  );

  // Reset input and displayed options when popover closes
  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      setInputValue('');
      setDisplayedOptions(optionsData);
    }
  }, [optionsData]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            <span className="text-sm capitalize text-gray-700">{label}</span>
            <span className="text-sm text-destructive">*</span>
          </FormLabel>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Popover open={open} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-9 w-full justify-between bg-transparent"
                  >
                    {field.value || `Select ${label}`}
                    <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput 
                      placeholder={`Search ${label}...`}
                      value={inputValue}
                      onValueChange={handleInputChange}
                    />
                    <CommandList>
                      <CommandEmpty>No {label} found.</CommandEmpty>
                      <CommandGroup>
                        {displayedOptions.map((option) => {
                          return (
                            <CommandItem
                              key={option.id}
                              value={option.name}
                              onSelect={() => {
                                field.onChange(option.name);
                                
                                // Store city_id for delivery calculation
                                if (cityIdFieldName) {
                                  setValue(cityIdFieldName, option.city_id);
                                }
                                
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value === option.name
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {option.name}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AreaSelectForm;
