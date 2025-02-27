'use client';

export default function CustomerMessage({ basePrice }) {
  if (!basePrice) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <p className="text-secondary">
        Wählen Sie Ihre gewünschte Installationswoche für Ihre Wärmepumpe. 
        Der Grundpreis von <span className="font-semibold">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(basePrice)}</span> kann 
        je nach gewählter Woche variieren.
      </p>
    </div>
  );
} 