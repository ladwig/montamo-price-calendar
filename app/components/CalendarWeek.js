'use client';

export default function CalendarWeek({ weekNumber, percentage, status, basePrice, disabled }) {
  // Calculate the price based on the percentage and base price
  const calculatePrice = () => {
    if (disabled) return null;
    
    const modifier = percentage / 100;
    const additionalAmount = basePrice * modifier;
    const finalPrice = basePrice + additionalAmount;
    
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalPrice);
  };

  // Determine the CSS class based on status and disabled state
  const getWeekClass = () => {
    if (disabled) return 'calendar-week calendar-week-disabled';
    return `calendar-week calendar-week-${status}`;
  };

  // Format the percentage for display
  const formatPercentage = () => {
    if (disabled) return '';
    return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
  };

  return (
    <div className={getWeekClass()}>
      <div className="text-sm font-semibold">KW {weekNumber}</div>
      {!disabled && (
        <>
          <div className="text-xs mt-1">{formatPercentage()}</div>
          <div className="font-bold mt-2">{calculatePrice()}</div>
        </>
      )}
      {disabled && (
        <div className="text-xs mt-1">Nicht verfügbar</div>
      )}
    </div>
  );
} 