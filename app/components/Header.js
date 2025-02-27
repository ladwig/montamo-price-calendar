'use client';

import Image from 'next/image';

export default function Header({ customerName, dealId, location }) {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Image 
            src="/montamo-logo.svg" 
            alt="Montamo Logo" 
            width={150} 
            height={40} 
            priority
          />
        </div>
        
        <div className="flex flex-col items-center md:items-end">
          {customerName && (
            <div className="text-sm text-gray-600">
              Kunde: <span className="font-semibold text-secondary">{customerName}</span>
            </div>
          )}
          
          {dealId && (
            <div className="text-sm text-gray-600">
              Angebots-ID: <span className="font-semibold text-secondary">{dealId}</span>
            </div>
          )}
          
          {location && (
            <div className="text-sm text-gray-600">
              Standort: <span className="font-semibold text-secondary">{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 