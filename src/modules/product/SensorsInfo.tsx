import React from 'react';
import { Heart, Activity, Wifi, Navigation } from 'lucide-react';

const sensorCategories = {
  health: {
    icon: Heart,
    title: 'Health Sensors',
    items: [
      'BioTrackerTM 3.0 PPG biometric sensor',
      'Blood-oxygen monitoring',
      '6PD + 2LED',
    ],
  },
  movement: {
    icon: Activity,
    title: 'Movement Sensors',
    items: [
      'Acceleration sensor',
      'Gyroscope sensor',
      'Geomagnetic sensor',
      'Air Pressure sensor (Barometer)',
      'Ambient light sensor',
    ],
  },
  connectivity: {
    icon: Wifi,
    title: 'Connectivity',
    items: ['Wi-Fi 2.4GHz', 'Bluetooth 5.3'],
  },
  positioning: {
    icon: Navigation,
    title: 'Positioning',
    items: [
      'Dual-band (L1+L5)',
      'GPS, GLONASS, Galileo',
      'BeiDou, QZSS, NAVIC',
    ],
  },
};

export default function SensorsInfo() {
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold">Sensors & Connectivity</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Object.entries(sensorCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <div key={key} className="rounded-lg bg-gray-50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Icon className="size-5 text-indigo-600" />
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-indigo-600"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
