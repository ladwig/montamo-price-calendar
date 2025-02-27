'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import CustomerMessage from './components/CustomerMessage';
import PriceCalendar from './components/PriceCalendar';
import Footer from './components/Footer';
import { fetchProjectData } from './lib/api';

function HomeContent() {
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState('');
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setError('No authentication token provided');
      setLoading(false);
      return;
    }

    async function loadProjectData() {
      try {
        const data = await fetchProjectData(token);
        setProjectData(data);
      } catch (error) {
        setError('Failed to load project data. Please check your authentication link.');
      } finally {
        setLoading(false);
      }
    }

    loadProjectData();
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

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-secondary">Keine Projektdaten verfügbar</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Header 
          customerName={projectData.properties?.customer_name}
          dealId={projectData.id}
          location={projectData.properties?.location}
        />
        
        <CustomerMessage basePrice={projectData.properties?.amount} />
        
        <PriceCalendar 
          basePrice={projectData.properties?.amount}
          customerName={projectData.properties?.customer_name}
          dealId={projectData.id}
          location={projectData.properties?.location}
        />

        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-secondary mb-4">Projektdetails</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-secondary">Geräte</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>Außengerät: {projectData.properties?.outdoor_unit}</li>
                <li>Inneneinheit: {projectData.properties?.inneneinheit}</li>
                <li>Wassertank: {projectData.properties?.water_tank}</li>
                <li>Puffer: {projectData.properties?.buffer}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-secondary">Dokumente</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {projectData.files?.heizlastberechnung && (
                  <li>Heizlastberechnung</li>
                )}
                {projectData.files?.quote && (
                  <li>Angebot</li>
                )}
                {projectData.files?.technicalVOC && (
                  <li>Technische Vorprüfung</li>
                )}
              </ul>
            </div>
          </div>
        </div>
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
