import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, formatStr, options = {}) => {
  return format(date, formatStr, { locale: de, ...options });
};
