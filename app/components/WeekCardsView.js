'use client';

import { useState } from 'react';
import { format, parse, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

export default function WeekCardsView({ priceMatrix, disabledWeeks, basePrice, onWeekSelect, selectedWeek }) {
  const [hoveredWeek, setHoveredWeek] = useState(null);

  // Function to calculate price for a week
  const calculatePrice = (weekNumber) => {
    const weekData = priceMatrix[weekNumber.toString()];
    if (!weekData) return null;
    
    const modifier = weekData.percentage / 100;
    const additionalAmount = basePrice * modifier;
    const finalPrice = basePrice + additionalAmount;
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalPrice);
  };

  // Function to get the date range for a week (Monday to Friday)
  const getWeekDateRange = (weekData) => {
    if (!weekData || !weekData.startDate) return '';
    
    try {
      const startDate = parse(weekData.startDate, 'yyyy-MM-dd', new Date());
      const endDate = parse(weekData.endDate, 'yyyy-MM-dd', new Date());
      
      // Ensure we only show Monday to Friday
      const mondayToFriday = `${format(startDate, 'dd.MM.', { locale: de })} - ${format(endDate, 'dd.MM.yyyy', { locale: de })}`;
      return mondayToFriday;
    } catch (error) {
      console.error('Error parsing dates:', error);
      return '';
    }
  };

  // Function to get the background color class based on status
  const getBackgroundColorClass = (percentage) => {
    if (percentage >= 10) {
      return 'bg-danger/20 border-danger text-danger hover:bg-danger/30'; // Red for +10% or more
    } else if (percentage <= -10) {
      return 'bg-success/20 border-success text-success hover:bg-success/30'; // Green for -10% or more
    } else {
      return 'bg-warning/20 border-warning text-warning hover:bg-warning/30'; // Orange for between +5% and -5%
    }
  };

  // Function to get the percentage indicator
  const getPercentageIndicator = (percentage) => {
    if (percentage === 0) return 'Standard'; // Show "Standard" for 0% discount
    return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
  };

  // Function to handle week selection
  const handleWeekSelect = (weekNumber) => {
    if (disabledWeeks.includes(parseInt(weekNumber))) return;
    
    if (onWeekSelect) {
      onWeekSelect(selectedWeek === parseInt(weekNumber) ? null : parseInt(weekNumber));
    }
  };

  // Get all weeks from the price matrix
  const weeks = Object.keys(priceMatrix).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-secondary mb-6">Kalenderwochen Übersicht</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {weeks.map((weekNumber) => {
          const weekData = priceMatrix[weekNumber];
          const isDisabled = disabledWeeks.includes(parseInt(weekNumber));
          const isSelected = selectedWeek === parseInt(weekNumber);
          
          return (
            <div
              key={weekNumber}
              className={`
                relative rounded-md p-1 border transition-all cursor-pointer
                ${isDisabled ? 'bg-gray-100 border-gray-200 text-disabled opacity-60 cursor-not-allowed' : 
                  isSelected ? 'bg-white border-primary text-secondary shadow-sm' : 
                  getBackgroundColorClass(weekData.percentage)}
                ${!isDisabled && !isSelected ? 'hover:border-primary hover:shadow-sm' : ''}
              `}
              onClick={() => handleWeekSelect(weekNumber)}
              onMouseEnter={() => setHoveredWeek(weekNumber)}
              onMouseLeave={() => setHoveredWeek(null)}
            >
              <div className="text-center font-semibold text-sm">KW {weekNumber}</div>
              
              {!isDisabled && (
                <>
                  <div className="text-center text-xs mt-0.5">
                    {getPercentageIndicator(weekData.percentage)}
                  </div>
                  <div className="text-center font-medium text-xs mt-1 text-secondary">
                    {calculatePrice(weekNumber)}
                  </div>
                </>
              )}
              
              {isDisabled && (
                <div className="text-center text-xs mt-1">
                  Nicht verfügbar
                </div>
              )}
              
              {hoveredWeek === weekNumber && !isDisabled && (
                <div className="absolute inset-x-0 -bottom-8 bg-white border border-gray-200 rounded-md p-1 shadow-sm z-10 text-xs text-center">
                  {getWeekDateRange(weekData)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 