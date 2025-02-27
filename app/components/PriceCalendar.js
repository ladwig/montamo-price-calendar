'use client';

import { useState, useEffect } from 'react';
// import { Calendar } from './ui/calendar';  // Commented out for now
import WeekCardsView from './WeekCardsView';
import SelectedWeekSection from './SelectedWeekSection';
import Spinner from './Spinner';
import { calculatePrice } from '../utils/priceCalculations';
import { saveBooking } from '../lib/firebase';

export default function PriceCalendar({ basePrice, isAuthenticated, projectId, existingBooking }) {
  const [priceMatrix, setPriceMatrix] = useState({});
  const [disabledWeeks, setDisabledWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const fetchPriceMatrix = async () => {
      try {
        const response = await fetch('/price-matrix.json');
        const data = await response.json();
        setPriceMatrix(data.priceMatrix);
        setDisabledWeeks(data.disabledWeeks);
        
        // If there's an existing booking, select that week
        if (existingBooking) {
          setSelectedWeek(existingBooking.weekNumber);
          setBookingStatus('confirmed');
        }
      } catch (error) {
        console.error('Error fetching price matrix:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceMatrix();
  }, [existingBooking]);

  const handleWeekSelect = (weekNumber) => {
    if (!isAuthenticated || bookingStatus === 'confirmed') {
      return;
    }
    setSelectedWeek(weekNumber);
  };

  const handleBooking = async (weekNumber) => {
    if (!isAuthenticated || !projectId) {
      return;
    }

    try {
      setBookingStatus('processing');
      const weekData = priceMatrix[weekNumber];
      const price = calculatePrice(weekData, basePrice);
      
      await saveBooking(projectId, weekData, weekNumber, price);
      setBookingStatus('confirmed');
    } catch (error) {
      console.error('Error booking week:', error);
      setBookingStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (bookingStatus === 'confirmed') {
    const bookedWeek = priceMatrix[selectedWeek];
    return (
      <div className="space-y-8">
        <div className="bg-success/20 border border-success rounded-lg p-4">
          <h3 className="text-lg font-semibold text-success mb-2">
            Installationswoche erfolgreich reserviert
          </h3>
          <p className="text-success">
            Sie haben die KW {selectedWeek} ({bookedWeek.startDate} - {bookedWeek.endDate}) 
            für Ihre Installation reserviert. Die Reservierung ist 7 Tage gültig. Wir melden uns schnellstmöglich mit einem aktualsierten Angebot und Terminbestätigung zurück.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WeekCardsView 
        priceMatrix={priceMatrix}
        disabledWeeks={disabledWeeks}
        basePrice={isAuthenticated ? parseInt(basePrice) : null}
        onWeekSelect={handleWeekSelect}
        selectedWeek={selectedWeek}
        isAuthenticated={isAuthenticated}
      />

      {isAuthenticated && selectedWeek && priceMatrix[selectedWeek] && (
        <SelectedWeekSection 
          weekNumber={selectedWeek}
          weekData={priceMatrix[selectedWeek]}
          basePrice={parseInt(basePrice)}
          onBook={handleBooking}
          isProcessing={bookingStatus === 'processing'}
          error={bookingStatus === 'error'}
        />
      )}

      {/* Commented out Calendar View */}
      {/*
      <Calendar
        month={month}
        onMonthChange={setMonth}
        className="w-full"
        priceMatrix={priceMatrix}
        disabledWeeks={disabledWeeks}
        basePrice={parseInt(basePrice)}
        onWeekSelect={handleWeekSelect}
      />
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-success"></div>
          <span className="text-sm">Günstigere Preise</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-warning"></div>
          <span className="text-sm">Standardpreise</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-danger"></div>
          <span className="text-sm">Höhere Preise (Hochsaison)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-disabled"></div>
          <span className="text-sm">Nicht verfügbar</span>
        </div>
      </div>
      */}
    </div>
  );
} 