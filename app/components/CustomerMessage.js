'use client';

export default function CustomerMessage({ basePrice }) {
  const formattedBasePrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseInt(basePrice));

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8">
      <h1 className="text-2xl font-bold text-secondary mb-4">
        Wärmepumpen-Preiskalender
      </h1>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Sehr geehrter Kunde, vielen Dank für Ihr Interesse an einer Wärmepumpe von Montamo. 
          Unser Basispreis für Ihre Wärmepumpe beträgt <span className="font-semibold text-secondary">{formattedBasePrice}</span>.
        </p>
        
        <p className="text-gray-700">
          Die Preise für Wärmepumpen variieren je nach Saison und Verfügbarkeit. In unserem Preiskalender 
          können Sie sehen, wie sich der Preis in verschiedenen Kalenderwochen verändert.
        </p>
        
        <p className="text-gray-700">
          Wählen Sie einfach Ihren gewünschten Installationszeitraum im Kalender aus. Die Preise werden für jede 
          Kalenderwoche angezeigt. Grüne Wochen bieten günstigere Preise, gelbe Wochen Standardpreise und 
          rote Wochen haben höhere Preise aufgrund der Hochsaison.
        </p>
        
        <div className="mt-2 p-3 bg-primary/10 border border-primary rounded-md">
          <p className="text-sm font-medium text-secondary">
            <span className="font-bold">Tipp:</span> Planen Sie Ihre Installation in den grün markierten Wochen, 
            um von unseren besten Preisen zu profitieren!
          </p>
        </div>
      </div>
    </div>
  );
} 