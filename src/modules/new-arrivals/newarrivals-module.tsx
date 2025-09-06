import React, { Suspense } from 'react';
import Fullloader from '@/components/common/loader/fullloader';
import Sectionloader from '@/components/common/loader/section-loader';
import FiltersComponent from '../../components/fitler';
import NewArrivalsContent from './content';

const NewArrivalsModule = ({ data }: { data: any }) => {
  // console.log(data);
  if (!data) {
    return <Fullloader />;
  }
  return (
    <div className="grid grid-cols-12 xl:gap-10">
      <div className="col-span-2 hidden xl:block">
        <FiltersComponent />
      </div>
      <div className="col-span-12 w-full xl:col-span-10">
        <Suspense fallback={<Sectionloader />}>
          <NewArrivalsContent data={data} />
        </Suspense>
      </div>
    </div>
  );
};

export default NewArrivalsModule;
