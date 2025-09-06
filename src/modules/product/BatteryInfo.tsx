import React from 'react';
import {
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
} from 'lucide-react';

const batterySpecs = [
  { icon: BatteryFull, title: 'Typical Usage', value: 'Up to 14 days' },
  {
    icon: BatteryCharging,
    title: 'Charging Duration',
    value: 'Approx. 2 hours',
  },
  { icon: Battery, title: 'Battery Saver Mode', value: 'Up to 24 days' },
  { icon: BatteryLow, title: 'Heavy Usage', value: 'Up to 7 days' },
];

const gpsSpecs = [
  { title: 'Accuracy GPS Mode', value: 'Up to 25 hours' },
  { title: 'Automatic GPS Mode', value: 'Up to 37 hours' },
  { title: 'Power Saving GPS Mode', value: 'Up to 45 hours' },
];

export default function BatteryInfo() {
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold">Battery Performance</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-6">
          <h3 className="mb-4 font-semibold">Battery Modes</h3>
          <div className="grid grid-cols-1 gap-4">
            {batterySpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="size-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">{spec.title}</p>
                    <p className="font-medium">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-6">
          <h3 className="mb-4 font-semibold">GPS Battery Life</h3>
          <div className="grid grid-cols-1 gap-4">
            {gpsSpecs.map((spec, idx) => (
              <div key={idx} className="border-l-2 border-indigo-600 pl-3">
                <p className="text-sm text-gray-600">{spec.title}</p>
                <p className="font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
