'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerMessage from './components/CustomerMessage';
import PriceCalendar from './components/PriceCalendar';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import { fetchProjectData } from './lib/api';
import { handleCustomToken, auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function HomeContent() {
  const searchParams = useSearchParams();
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Always check for a new token in URL first
        const token = searchParams.get('token');
        if (token) {
          try {
            // If there's a new token, try to use it
            const idToken = await handleCustomToken(token);
            setIsAuthenticated(true);
            const data = await fetchProjectData(idToken);
            setProjectData(data);
          } catch (tokenError) {
            console.error('Error with new token:', tokenError);
            // If token fails and we have an existing session, use that instead
            if (user) {
              console.log('Falling back to existing session');
              setIsAuthenticated(true);
              const idToken = await user.getIdToken();
              const data = await fetchProjectData(idToken);
              setProjectData(data);
            } else {
              throw tokenError; // Re-throw if we have no fallback
            }
          }
        } else if (user) {
          // No new token but user is signed in
          setIsAuthenticated(true);
          const idToken = await user.getIdToken();
          const data = await fetchProjectData(idToken);
          setProjectData(data);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Failed to authenticate. Please check your access link.');
        if (!user) {
          // Only clear auth state if we don't have a valid session
          setIsAuthenticated(false);
          setProjectData(null);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  if (error && !isAuthenticated) {
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
        <Spinner />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
