export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, formatStr, options = {}) => {
  const { format } = require('date-fns');
  const { de } = require('date-fns/locale');
  return format(date, formatStr, { locale: de, ...options });
};
