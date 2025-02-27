'use client';

import { useState, useEffect } from 'react';
import { format, parse, getWeek, startOfToday } from 'date-fns';
import { de } from 'date-fns/locale';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { calculatePrice, formatPercentage } from '../utils/priceCalculations';

function WeekCard({ week, weekNumber, isSelected, isPastWeek, onSelect, onHover, isAuthenticated }) {
  const isDisabled = week.isDisabled || isPastWeek || week.availability <= 0;

  const getBackgroundColorClass = (percentage) => {
    if (isSelected) {
      return 'bg-white border-2 border-primary text-secondary shadow-md';
    }
    if (percentage >= 10) {
      return 'bg-danger/20 border border-danger text-danger hover:bg-danger/30';
    } else if (percentage <= -10) {
      return 'bg-success/20 border border-success text-success hover:bg-success/30';
    } else {
      return 'bg-warning/20 border border-warning text-warning hover:bg-warning/30';
    }
  };

  return (
    <div
      className={`
        relative rounded-md p-2 transition-all cursor-pointer min-h-[5.5rem]
        ${isDisabled ? 'bg-gray-100 border border-gray-200 text-disabled opacity-60 cursor-not-allowed' : 
          getBackgroundColorClass(week.percentage)}
        ${!isDisabled && !isSelected ? 'hover:border-primary hover:shadow-sm' : ''}
        ${isSelected ? 'transform scale-[1.02]' : ''}
        ${!isAuthenticated ? 'cursor-default' : ''}
      `}
      onClick={() => !isDisabled && onSelect(parseInt(weekNumber))}
      onMouseEnter={() => onHover(weekNumber)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`text-center font-semibold text-sm ${isSelected ? 'text-secondary' : ''}`}>
        KW {weekNumber}
      </div>
      
      {!isDisabled ? (
        <>
          {isAuthenticated ? (
            <>
              <div className="text-center text-xs mt-0.5">
                {formatPercentage(week.percentage)}
              </div>
              <div className={`text-center font-medium text-xs mt-1 ${isSelected ? 'text-secondary' : ''}`}>
                {calculatePrice(week, week.basePrice)}
              </div>
              <div className="text-center text-xs mt-0.5 text-gray-500">
                {week.availability} verfügbar
              </div>
            </>
          ) : (
            <div className="text-center text-xs mt-1 flex-1 flex items-center justify-center">
              {week.availability > 0 ? `${week.availability} verfügbar` : 'Ausgebucht'}
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-xs mt-1 flex-1 flex items-center justify-center">
          {isPastWeek ? 'Vergangen' : week.availability <= 0 ? 'Ausgebucht' : 'Nicht verfügbar'}
        </div>
      )}
    </div>
  );
}

function Legend() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success/20 border border-success rounded"></div>
          <span className="text-sm">Günstige Wochen (-10% oder mehr)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warning/20 border border-warning rounded"></div>
          <span className="text-sm">Standard Wochen (±9%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-danger/20 border border-danger rounded"></div>
          <span className="text-sm">Premium Wochen (+10% oder mehr)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
          <span className="text-sm">Nicht verfügbar</span>
        </div>
      </div>
    </div>
  );
}

export default function WeekCardsView({ basePrice, onWeekSelect, selectedWeek, isAuthenticated }) {
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [weekData, setWeekData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  
  useEffect(() => {
    // Move date calculations to client-side only
    const today = startOfToday();
    setCurrentWeek(getWeek(today, { locale: de }));
  }, []);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchWeekData = async () => {
      setLoading(true);
      setError(null);
      try {
        const yearDocRef = doc(db, 'price-calendar-weeks', currentYear.toString());
        const yearDoc = await getDoc(yearDocRef);
        
        if (yearDoc.exists()) {
          setWeekData(yearDoc.data().weekData);
        } else {
          setError('No data available for the current year');
          console.error('No data available for the current year');
        }
      } catch (error) {
        setError('Error fetching week data');
        console.error('Error fetching week data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekData();
  }, [currentYear]);

  // Function to check if a week is in the past
  const isWeekInPast = (weekNumber) => {
    return currentWeek ? weekNumber < currentWeek : false;
  };

  // Function to get the date range for a week
  const getWeekDateRange = (week) => {
    if (!week || !week.startDate) return '';
    
    try {
      const startDate = parse(week.startDate, 'yyyy-MM-dd', new Date());
      const endDate = parse(week.endDate, 'yyyy-MM-dd', new Date());
      
      return `${format(startDate, 'dd.MM.', { locale: de })} - ${format(endDate, 'dd.MM.yyyy', { locale: de })}`;
    } catch (error) {
      console.error('Error parsing dates:', error);
      return '';
    }
  };

  if (loading || currentWeek === null) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-secondary">Lade Preiskalender...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isAuthenticated && <Legend />}

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-secondary mb-3">
          Kalenderwochen Übersicht {currentYear}
        </h2>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-2">
          {Object.entries(weekData).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([weekNumber, week]) => {
            const isPastWeek = isWeekInPast(parseInt(weekNumber));
            const isWeekSelected = selectedWeek === parseInt(weekNumber);
            
            return (
              <div key={weekNumber} className="relative">
                <WeekCard
                  week={{ ...week, basePrice }}
                  weekNumber={weekNumber}
                  isSelected={isWeekSelected}
                  isPastWeek={isPastWeek}
                  onSelect={onWeekSelect}
                  onHover={setHoveredWeek}
                  isAuthenticated={isAuthenticated}
                />
                
                {hoveredWeek === weekNumber && !isPastWeek && !week.isDisabled && week.availability > 0 && (
                  <div className="absolute inset-x-0 -bottom-8 bg-white border border-gray-200 rounded-md p-1 shadow-sm z-10 text-xs text-center">
                    {getWeekDateRange(week)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 