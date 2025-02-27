'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerMessage from './components/CustomerMessage';
import PriceCalendar from './components/PriceCalendar';
import Footer from './components/Footer';
import { fetchProjectData } from './lib/api';
import { handleMagicLink } from './lib/firebase';

function HomeContent() {
  const searchParams = useSearchParams();
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handleAuth() {
      try {
        // Check for oobCode in URL and get Firebase ID token
        const oobCode = searchParams.get('oobCode');
        if (oobCode) {
          const firebaseToken = await handleMagicLink();
          if (firebaseToken) {
            setIsAuthenticated(true);
            const data = await fetchProjectData(firebaseToken);
            setProjectData(data);
            return;
          }
        }

        // If no oobCode or Firebase auth failed, check for direct token
        const token = searchParams.get('token');
        setIsAuthenticated(!!token);
        
        if (!token) {
          setLoading(false);
          return;
        }

        const data = await fetchProjectData(token);
        setProjectData(data);
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Failed to load project data. Please check your authentication link.');
      } finally {
        setLoading(false);
      }
    }

    handleAuth();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-secondary">Lade Projektdaten...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-danger text-center max-w-md mx-auto p-4">
          <h2 className="text-xl font-semibold mb-2">Fehler beim Laden</h2>
          <p>{error}</p>
          <p className="text-sm mt-4">Bitte überprüfen Sie Ihren Zugangslink oder kontaktieren Sie den Support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Header />
        
        {isAuthenticated && projectData && (
          <CustomerMessage 
            basePrice={projectData.amount} 
            customerName={projectData.customerName}
          />
        )}
        
        <PriceCalendar 
          basePrice={isAuthenticated ? projectData?.amount : null}
          isAuthenticated={isAuthenticated}
        />

        {!isAuthenticated && (
          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary">
            <h3 className="text-lg font-semibold text-secondary mb-2">Hinweis</h3>
            <p className="text-secondary">
              Um Preise zu sehen und Termine zu buchen, benötigen Sie einen gültigen Zugangslink. 
              Bitte kontaktieren Sie Ihren Montamo-Berater.
            </p>
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
