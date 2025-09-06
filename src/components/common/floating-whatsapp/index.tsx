'use client';

import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { Urbanist } from 'next/font/google';
import { cn } from '@/lib/utils';

const urbanist = Urbanist({ subsets: ['latin'] });

const WhatsAppFloatingButton = () => {
  return (
    <>
      <div className="md:hidden">
        <FloatingWhatsApp
          phoneNumber={'+8801670957108'}
          accountName="TechStudio Support"
          avatar="/logo_bd.webp"
          statusMessage="Typically replies within 1 hour"
          chatMessage="Hello there! 🤝 How can we help you today?"
          placeholder="Type a message..."
          className={cn(urbanist.className)}
          buttonClassName="!w-12 !h-12 !bottom-20 !right-4 !rounded-full !shadow-lg hover:!scale-105 transition-transform"
          chatboxClassName="!rounded-xl !shadow-xl"
          notification
          notificationDelay={30000}
          buttonStyle={{
            transform: 'scale(0.8)', // Makes everything inside smaller
            transformOrigin: 'center',
          }}
          notificationSound={false}
        />
      </div>
      <div className="hidden md:block">
        <FloatingWhatsApp
          phoneNumber={'+8801670957108'}
          accountName="TechStudio Support"
          avatar="/logo_bd.webp"
          statusMessage="Typically replies within 1 hour"
          chatMessage="Hello there! 🤝 How can we help you today?"
          placeholder="Type a message..."
          className={cn(urbanist.className)}
          buttonClassName="!w-14 !h-14 !p-2 !rounded-full !shadow-lg hover:!scale-105 transition-transform"
          chatboxClassName="!rounded-xl !shadow-xl"
          notification
          notificationDelay={30000}
          buttonStyle={{
            transform: 'scale(0.8)', // Makes everything inside smaller
            transformOrigin: 'center',
          }}
          notificationSound={false}
        />
      </div>
    </>
  );
};

export default WhatsAppFloatingButton;
