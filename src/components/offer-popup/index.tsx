'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { XIcon } from 'lucide-react';

// Cooldown period in milliseconds (6 hours)
const COOLDOWN_PERIOD = 6 * 60 * 60 * 1000;

function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setShowPopup(isOpen);
    if (!isOpen) {
      // Store dismissal time when user closes the popup
      localStorage.setItem('popupDismissed', Date.now().toString());
    }
  };

  useEffect(() => {
    const checkPopupDismissed = () => {
      const dismissedTime = localStorage.getItem('popupDismissed');

      if (dismissedTime) {
        const timeSinceDismissal = Date.now() - parseInt(dismissedTime);
        if (timeSinceDismissal < COOLDOWN_PERIOD) {
          return false; // Still within cooldown period
        }
      }
      return true; // Show popup
    };

    if (checkPopupDismissed()) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={showPopup} onOpenChange={handleOpenChange}>
      <DialogContent
        showClose={false}
        className="h-auto w-full overflow-y-hidden rounded-3xl p-0"
      >
        <DialogHeader className="hidden">
          <DialogTitle>Delivery Offer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogClose className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white">
          <XIcon />
        </DialogClose>
        <picture>
          <img src="/delivery-popup.webp" alt="offer" className="size-full" />
        </picture>
      </DialogContent>
    </Dialog>
  );
}

export default OfferPopup;
