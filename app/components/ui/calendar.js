"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, getWeek, addMonths, isWeekend } from "date-fns"
import { de } from "date-fns/locale"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function Calendar({
  className,
  classNames,
  priceMatrix,
  disabledWeeks,
  basePrice,
  onWeekSelect,
  month,
  onMonthChange,
  ...props
}) {
  const [selectedWeek, setSelectedWeek] = React.useState(null);
  const [currentMonth, setCurrentMonth] = React.useState(month || new Date());

  // Function to get the week number of a date
  const getWeekNumber = (date) => {
    return getWeek(date, { locale: de })
  }

  // Function to check if a date is within a disabled week
  const isDateInDisabledWeek = (date) => {
    const weekNumber = getWeekNumber(date)
    return disabledWeeks.includes(weekNumber)
  }

  // Function to get the status and percentage for a week
  const getWeekData = (weekNumber) => {
    const weekData = priceMatrix[weekNumber.toString()] || { percentage: 0, status: 'warning' }
    return weekData
  }

  // Function to calculate price for a week
  const calculatePrice = (weekNumber) => {
    const weekData = getWeekData(weekNumber)
    const modifier = weekData.percentage / 100
    const additionalAmount = basePrice * modifier
    const finalPrice = basePrice + additionalAmount
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalPrice)
  }

  // Function to check if a date is in the selected week
  const isDateInSelectedWeek = (date) => {
    if (!selectedWeek) return false;
    
    const weekNumber = getWeekNumber(date);
    return weekNumber === selectedWeek;
  }

  // Function to handle day click
  const handleDayClick = (date) => {
    if (isDateInDisabledWeek(date) || isWeekend(date)) return;
    
    const weekNumber = getWeekNumber(date);
    const newSelectedWeek = selectedWeek === weekNumber ? null : weekNumber;
    
    setSelectedWeek(newSelectedWeek);
    
    if (onWeekSelect) {
      onWeekSelect(newSelectedWeek);
    }
  }

  // Function to handle month change
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  }

  // Function to render a single month calendar
  const renderMonthCalendar = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = new Date(year, month, 1).getDay();
    // Adjust for Monday as first day of week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Create array for all days in the month
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return (
      <div className="p-3 border rounded-md">
        <div className="text-lg font-medium text-center mb-4">
          {format(monthDate, 'MMMM yyyy', { locale: de })}
        </div>
        
        <div className="grid grid-cols-5 gap-1 mb-2">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-5 gap-1">
          {days.map((day, dayIndex) => {
            if (!day || isWeekend(day)) {
              return <div key={`empty-${dayIndex}`} className="p-2" />;
            }
            
            const weekNumber = getWeekNumber(day);
            const isDisabled = isDateInDisabledWeek(day);
            const isSelected = isDateInSelectedWeek(day);
            const weekData = getWeekData(weekNumber);
            
            // Determine the style based on status and selection
            let dayStyle = "";
            
            if (isDisabled) {
              dayStyle = "bg-gray-100 text-disabled opacity-60";
            } else if (isSelected) {
              dayStyle = "bg-white border-2 border-primary text-secondary";
            } else {
              switch (weekData.status) {
                case 'success':
                  dayStyle = "bg-success/20 border border-success text-success hover:border-primary hover:border-2";
                  break;
                case 'warning':
                  dayStyle = "bg-warning/20 border border-warning text-warning hover:border-primary hover:border-2";
                  break;
                case 'danger':
                  dayStyle = "bg-danger/20 border border-danger text-danger hover:border-primary hover:border-2";
                  break;
                default:
                  dayStyle = "bg-white border border-gray-200 text-secondary hover:border-primary hover:border-2";
              }
            }
            
            return (
              <div
                key={dayIndex}
                className={cn(
                  "calendar-day cursor-pointer",
                  dayStyle
                )}
                onClick={() => handleDayClick(day)}
              >
                <div className="text-center font-medium">
                  {format(day, 'd', { locale: de })}
                </div>
                
                {!isDisabled && (
                  <div className="calendar-day-price text-center">
                    {calculatePrice(weekNumber)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange(addMonths(currentMonth, -3))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="text-lg font-medium">
          {format(currentMonth, 'MMMM', { locale: de })} - {format(addMonths(currentMonth, 2), 'MMMM yyyy', { locale: de })}
        </div>
        
        <button
          onClick={() => handleMonthChange(addMonths(currentMonth, 3))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderMonthCalendar(currentMonth)}
        {renderMonthCalendar(addMonths(currentMonth, 1))}
        {renderMonthCalendar(addMonths(currentMonth, 2))}
      </div>
    </div>
  );
} 