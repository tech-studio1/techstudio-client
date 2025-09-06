'use client';
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const IdealFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapsible = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Collapsible open={isOpen} onOpenChange={toggleCollapsible}>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-2 font-semibold text-gray-500 hover:text-black">
        <span>Ideal For</span>
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox /> <span>Male</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox /> <span>Female</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox /> <span>Child</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default IdealFilter;
