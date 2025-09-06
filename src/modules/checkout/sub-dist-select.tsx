'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useMemo, useState } from 'react';
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
import { onlyUnique } from '@/lib/helpers';

type SelectFormProps = {
  label: string;
  name: string;
  options: Array<any>;
  districtSelectValue: string | null;
};

const SubDistrictSelectForm: React.FC<SelectFormProps> = ({
  label,
  name,
  options,
  districtSelectValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();

  const optionsData = useMemo(() => {
    return options
      .filter((option) => option.district_name === districtSelectValue)
      .map((op) => op.subdistrict_name)
      .filter(onlyUnique);
  }, [options, districtSelectValue]);

  return (
    <>
      {optionsData?.length ? (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                <span className="text-sm capitalize text-gray-700">
                  {label}
                </span>
                <span className="text-sm text-destructive">*</span>
              </FormLabel>
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="h-9 w-full justify-between bg-transparent"
                      >
                        {field.value || `Select ${label}`}
                        <ChevronsUpDown className="ml-2 size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder={`Search ${label}...`} />
                        <CommandList>
                          <CommandEmpty>No {label} found.</CommandEmpty>
                          <CommandGroup>
                            {optionsData.map((subdistrict) => (
                              <CommandItem
                                key={subdistrict}
                                value={subdistrict}
                                onSelect={() => {
                                  field.onChange(subdistrict);
                                  setIsOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === subdistrict
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {subdistrict}
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
      ) : undefined}
    </>
  );
};

export default SubDistrictSelectForm;
