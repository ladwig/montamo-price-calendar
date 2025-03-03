import { formatCurrency } from './formatting';

export function calculatePrice(weekData, basePrice) {
  if (!weekData || !basePrice) return null;
  
  const modifier = weekData.percentage / 100;
  const additionalAmount = basePrice * modifier;
  const finalPrice = parseInt(basePrice) + additionalAmount;
  
  return formatCurrency(finalPrice);
}

export function formatPercentage(percentage) {
  if (percentage === 0) return 'Standard';
  return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
}