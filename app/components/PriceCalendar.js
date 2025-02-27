'use client';

import { useState, useEffect } from 'react';
import { Calendar } from './ui/calendar';
import WeekCardsView from './WeekCardsView';

export default function PriceCalendar({ basePrice, customerName, dealId, location }) {
  const [priceMatrix, setPriceMatrix] = useState({});
  const [disabledWeeks, setDisabledWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date(2024, 4, 1)); // May 2024 as default (month is 0-indexed)
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    // Fetch the price matrix data
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
    setSelectedWeek(weekNumber);
  };

  const calculatePrice = (weekNumber) => {
    if (!priceMatrix || !weekNumber) return null;
    
    const weekData = priceMatrix[weekNumber.toString()];
    if (!weekData) return null;
    
    const modifier = weekData.percentage / 100;
    const additionalAmount = basePrice * modifier;
    const finalPrice = parseInt(basePrice) + additionalAmount;
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalPrice);
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
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-secondary mb-6">Preiskalender {month.getFullYear()}</h2>
        
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
      </div>
      
      {/* Week Cards View */}
      <WeekCardsView 
        priceMatrix={priceMatrix}
        disabledWeeks={disabledWeeks}
        basePrice={parseInt(basePrice)}
        onWeekSelect={handleWeekSelect}
        selectedWeek={selectedWeek}
      />
      
      {selectedWeek && priceMatrix[selectedWeek] && (
        <div className="w-full bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="p-4 bg-primary/10 border border-primary rounded-md">
            <h3 className="font-semibold text-secondary">Ausgewählte Woche: KW {selectedWeek}</h3>
            <p className="mt-2">
              Preis für diese Woche: <span className="font-bold">{calculatePrice(selectedWeek)}</span>
              {priceMatrix[selectedWeek].percentage !== 0 && (
                <span className="ml-2 text-sm">
                  ({priceMatrix[selectedWeek].percentage > 0 ? '+' : ''}{priceMatrix[selectedWeek].percentage}% vom Basispreis)
                </span>
              )}
            </p>
            <p className="mt-2 text-sm">
              Zeitraum: {priceMatrix[selectedWeek].startDate} bis {priceMatrix[selectedWeek].endDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 