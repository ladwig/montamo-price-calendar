'use client';

import { useState, useEffect } from 'react';
// import { Calendar } from './ui/calendar';  // Commented out for now
import WeekCardsView from './WeekCardsView';
import SelectedWeekSection from './SelectedWeekSection';
import { calculatePrice } from '../utils/priceCalculations';

export default function PriceCalendar({ basePrice, isAuthenticated }) {
  const [priceMatrix, setPriceMatrix] = useState({});
  const [disabledWeeks, setDisabledWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    const fetchPriceMatrix = async () => {
      try {
        const response = await fetch('/price-matrix.json');
        const data = await response.json();
        setPriceMatrix(data.priceMatrix);
        setDisabledWeeks(data.disabledWeeks);
      } catch (error) {
        console.error('Error fetching price matrix:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceMatrix();
  }, []);

  const handleWeekSelect = (weekNumber) => {
    if (!isAuthenticated) {
      return;
    }
    setSelectedWeek(weekNumber);
  };

  const handleBooking = (weekNumber) => {
    if (!isAuthenticated) {
      return;
    }
    // Handle booking logic here
    console.log('Booking week:', weekNumber, {
      price: calculatePrice(priceMatrix[weekNumber], basePrice)
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-secondary">Lade Preiskalender...</div>
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