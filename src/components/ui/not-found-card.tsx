import React from 'react';
import { Card } from './card';

function NotFoundCard({ title = 'Not Found' }: { title?: string }) {
  return (
    <Card className="m-auto mt-20 flex min-h-96 w-full flex-col items-center justify-center md:w-6/12">
      <h1>{title}</h1>
    </Card>
  );
}

export default NotFoundCard;
