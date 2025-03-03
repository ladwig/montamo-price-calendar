'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Impressum - Montamo',
  description: 'Impressum und rechtliche Informationen der Montamo GmbH',
};

export default function Imprint() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Header />
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold text-secondary mb-6">Impressum</h1>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-secondary">
              Montamo GmbH<br />
              Musterstraße 123<br />
              12345 Musterstadt
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Vertreten durch</h2>
            <p className="text-secondary">
              Geschäftsführer: Max Mustermann
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Kontakt</h2>
            <p className="text-secondary">
              Telefon: +49 (0) 123 456 789<br />
              E-Mail: info@montamo.de
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Registereintrag</h2>
            <p className="text-secondary">
              Registergericht: Amtsgericht Musterstadt<br />
              Registernummer: HRB 12345
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-secondary mb-4">Haftungsausschluss</h2>
            <p className="text-secondary mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p className="text-secondary">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
