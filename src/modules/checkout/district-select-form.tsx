import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useState, useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SelectFormProps = {
  className?: String;
  label: string;
  name: string;
  option_field: string;
  options: Array<any>;
};

const DistrictSelectForm: React.FC<SelectFormProps> = ({
  className,
  option_field,
  label,
  name,
  options,
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [displayedOptions, setDisplayedOptions] = useState(options);

  // Sync displayedOptions with options prop changes
  useEffect(() => {
    if (inputValue === '') {
      setDisplayedOptions(options);
    }
  }, [options, inputValue]);

  const handleInputChange = useCallback(
    (inputValue: string) => {
      setInputValue(inputValue);

      if (inputValue === '') {
        setDisplayedOptions(options);
      } else {
        const filteredOptions = options.filter((option) =>
          option[option_field]?.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setDisplayedOptions(filteredOptions);
      }
    },
    [options, option_field],
  );

  // Reset input and displayed options when popover closes
  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
    if (!open) {
      setInputValue('');
      setDisplayedOptions(options);
    }
  }, [options]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', `${className}`)}>
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
                    {field.value
                      ? displayedOptions.find(
                          (option) => option[option_field] === field.value,
                        )?.[option_field]
                      : `Select ${label}`}
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
                        {displayedOptions.map((option) => (
                          <CommandItem
                            key={option[option_field]}
                            value={option[option_field]}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value
                                  ? ''
                                  : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === option[option_field]
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {option[option_field]}
                          </CommandItem>
                        ))}
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

export default DistrictSelectForm;
