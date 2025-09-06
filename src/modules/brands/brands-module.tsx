import React from 'react';
import FiltersComponent from '../../components/fitler';
import BrandsContent from './content';

const BrandsModule = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-12 xl:gap-10">
      <div className="col-span-2 hidden xl:block">
        <FiltersComponent />
      </div>
      <div className="col-span-12 w-full xl:col-span-10">
        <BrandsContent data={data} />
      </div>
    </div>
  );
};

export default BrandsModule;
