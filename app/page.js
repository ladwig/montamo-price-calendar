'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerMessage from './components/CustomerMessage';
import PriceCalendar from './components/PriceCalendar';
import Footer from './components/Footer';

function HomeContent() {
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState('');
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Get URL parameters with default values
  const basePrice = searchParams.get('basePrice') || '';
  const customerName = searchParams.get('customerName') || '';
  const dealId = searchParams.get('dealId') || '';
  const location = searchParams.get('location') || '';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Header 
          customerName={customerName}
          dealId={dealId}
          location={location}
        />
        
        <CustomerMessage basePrice={basePrice} />
        
        <PriceCalendar 
          basePrice={basePrice}
          customerName={customerName}
          dealId={dealId}
          location={location}
        />

        {(!customerName && !dealId && !location) && origin && (
          <div className="mt-8 p-4 bg-secondary/10 rounded-md">
            <h3 className="text-lg font-semibold text-secondary mb-2">Beispiel-URL für Kundenparameter:</h3>
            <code className="block p-3 bg-white rounded border text-sm overflow-x-auto">
              {`${origin}/?basePrice=12500&customerName=Max%20Mustermann&dealId=WP-2023-001&location=München`}
            </code>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-secondary">Lade...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
