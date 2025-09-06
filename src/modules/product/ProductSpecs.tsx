import React from 'react';
import { Settings } from 'lucide-react';

interface ProductSpecsProps {
  specs: Array<{ key: string; value: string }>;
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  // Clean up spec keys by removing trailing tabs
  const cleanSpecs = specs.map((spec) => ({
    key: spec.key.replace(/\t/g, '').trim(),
    value: spec.value,
  }));

  if (cleanSpecs?.length === 0) {
    return;
  }

  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Product Specifications</h2>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cleanSpecs.map((spec, idx) => (
              <div key={idx} className="space-y-1">
                <dt className="text-sm font-medium text-gray-600">
                  {spec.key}
                </dt>
                <dd className="text-gray-900">{spec.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
