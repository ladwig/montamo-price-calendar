'use client';

export default function CustomerMessage({ basePrice, customerName }) {
  if (!basePrice) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat('de-DE', { 
    style: 'currency', 
    currency: 'EUR', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(basePrice);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl font-semibold text-secondary mb-3">
        Hallo {customerName}!
      </h2>
      <p className="text-secondary">
        Wählen Sie Ihre gewünschte Installationswoche für Ihre Wärmepumpe. 
        Der Grundpreis von <span className="font-semibold">{formattedPrice}</span> kann 
        je nach gewählter Woche variieren.
      </p>
    </div>
  );
} 