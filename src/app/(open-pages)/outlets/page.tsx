import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Clock, MessageCircleOff } from 'lucide-react';

const outlets = [
  {
    name: 'Tech Studio Office',
    location: 'Dhaka',
    purpose: 'Pickup Point',
    address: 'Shop no 109, Motalib Plaza, Dhaka',
    phone: '+88 01670957108',
    hours: '11:00 AM - 9:00 PM',
    Close: 'Tuesday',
    image:
      'https://lh5.googleusercontent.com/p/AF1QipN51SiB8N_CCvT6TkTRpq_-e_NxjgaaAOMh3ufN',
  },
  {
    name: 'Tech Studio',
    location: 'Munshiganj',
    purpose: 'Outlet & Pickup Point',
    address:
      'Shop no 22, Moon Tower(Shundorban Courier office),Munshiganj Sadar, Munshiganj',
    phone: '+88 01670957108',
    hours: '10:00 AM - 9:00 PM',
    Close: 'Friday',
    image: '/outlet/munshiganj.jpg',
  },
];

export default function Outlets() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Our Outlets
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find a Tech Studio location near you
        </p>
      </div>

      {/* <div className="mx-auto mt-8 max-w-xl">
        <div className="flex gap-4">
          <Input placeholder="Enter your location or zip code" />
          <Button>
            <Search className="mr-2 size-4" />
            Find Stores
          </Button>
        </div>
      </div> */}

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {outlets.map((outlet) => (
          <Card key={outlet.name} className="overflow-hidden">
            <picture>
              <img
                src={outlet.image}
                alt={outlet.name}
                className="h-48 w-full object-cover"
              />
            </picture>
            <CardContent className="size-full p-6">
              <h3 className="text-lg font-semibold">{outlet.name}</h3>
              <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                <p>{outlet.location}</p> <p>{`(${outlet.purpose})`}</p>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-start">
                  <MapPin className="mr-3 size-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {outlet.address}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 size-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {outlet.phone}
                  </p>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 size-5 shrink-0 text-muted-foreground" />
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {outlet.hours}
                  </p>
                </div>
                <div className="flex items-start">
                  <MessageCircleOff className="mr-3 size-5 shrink-0 text-muted-foreground" />
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    Close: {outlet.Close}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
