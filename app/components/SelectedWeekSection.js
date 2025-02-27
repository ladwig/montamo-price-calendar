import { calculatePrice } from '../utils/priceCalculations';
import { format, parse } from 'date-fns';
import { de } from 'date-fns/locale';

export default function SelectedWeekSection({ weekNumber, weekData, basePrice, onBook }) {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-2">
            Ausgewählte Installationswoche
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-secondary">
              {calculatePrice(weekData, basePrice)}
            </span>
            <span className="text-sm text-gray-500">
              KW {weekNumber}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {getWeekDateRange(weekData)}
          </p>
          <p className="text-xs text-gray-500 mt-2 max-w-xl">
            * Buchung ist 7 Tage lang gültig, in dieser Zeit muss der Vertragabschluss erfolgen.
          </p>
        </div>
        <button
          className="bg-primary hover:bg-primary/90 text-secondary px-6 py-2 rounded-md font-semibold transition-colors"
          onClick={() => onBook(weekNumber)}
        >
          Buchen
        </button>
      </div>
    </div>
  );
} 