'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Datenschutzerklärung - Montamo',
  description: 'Datenschutzrichtlinien und Informationen zur Datenverarbeitung der Montamo GmbH',
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Header />
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold text-secondary mb-6">Datenschutzerklärung</h1>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">1. Grundlegende Informationen</h2>
            <p className="text-secondary mb-2">
              Die Montamo GmbH nimmt den Schutz Ihrer persönlichen Daten sehr ernst. 
              Diese Datenschutzerklärung informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">2. Verantwortliche Stelle</h2>
            <p className="text-secondary">
              Montamo GmbH<br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              E-Mail: datenschutz@montamo.de
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">3. Arten der verarbeiteten Daten</h2>
            <ul className="list-disc list-inside text-secondary">
              <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
              <li>Projektbezogene Daten</li>
              <li>Nutzungsdaten</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">4. Zwecke der Datenverarbeitung</h2>
            <p className="text-secondary mb-2">
              Wir verarbeiten Ihre Daten ausschließlich zum Zweck der Projektabwicklung und Kundenbetreuung.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">5. Ihre Rechte</h2>
            <p className="text-secondary mb-2">
              Sie haben das Recht auf:
            </p>
            <ul className="list-disc list-inside text-secondary">
              <li>Auskunft über Ihre gespeicherten Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung Ihrer Daten</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-4">6. Kontakt bei Datenschutzfragen</h2>
            <p className="text-secondary">
              Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter: datenschutz@montamo.de
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
