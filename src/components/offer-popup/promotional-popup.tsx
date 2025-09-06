import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface PromotionalPopupProps {
  title: string;
  description: string;
  image?: string;
  discount?: string;
  expiryDate?: Date;
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'center';
  showDelay?: number; // in milliseconds
  onClose?: () => void;
  onAction?: () => void;
  actionText?: string;
  className?: string;
}

export function PromotionalPopup({
  title,
  description,
  image,
  discount,
  expiryDate,
  position = 'bottom-right',
  showDelay = 3000,
  onClose,
  onAction,
  actionText = 'Shop Now',
  className,
}: PromotionalPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasShown = sessionStorage.getItem('promo_popup_shown');

    if (!hasShown && !hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        sessionStorage.setItem('promo_popup_shown', 'true');
      }, showDelay);

      return () => clearTimeout(timer);
    }
  }, [showDelay, hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleAction = () => {
    if (onAction) onAction();
    handleClose();
  };

  // Format expiry date if provided
  const formattedDate = expiryDate
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(expiryDate)
    : null;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-50 duration-500 animate-in fade-in slide-in-from-bottom-10',
        positionClasses[position],
        position === 'center' ? 'mx-auto w-full max-w-md' : 'max-w-sm',
        className,
      )}
    >
      <Card className="overflow-hidden border-2 shadow-lg">
        <CardHeader className="relative p-0">
          {image && (
            <div className="relative h-40 w-full">
              <picture>
                <img
                  src={image}
                  alt="Promotional offer"
                  className="size-full object-cover"
                />
              </picture>
              {discount && (
                <div className="absolute right-4 top-4 animate-pulse rounded-full bg-red-500 px-4 py-2 font-bold text-white">
                  {discount}
                </div>
              )}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleClose}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>

        <CardContent className={cn('pt-6', !image && 'pt-10')}>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>

          {expiryDate && (
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium">Offer ends: {formattedDate}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between gap-2 pb-6 pt-0">
          <Button variant="outline" className="w-1/3" onClick={handleClose}>
            No thanks
          </Button>
          <Button className="w-2/3" onClick={handleAction}>
            {actionText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
