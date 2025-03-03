import Footer from '@/components/Footer';

export const metadata = {
  title: 'Imprint | montamo',
  description: 'Legal information and company details for montamo GmbH',
};

export default function Imprint() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-secondary mb-8">Imprint</h1>
        
        <div className="prose max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Information according to § 5 TMG</h2>
            <p className="font-semibold">montamo GmbH</p>
            <p>Torstraße 19, 10119 Berlin, Germany</p>
            <p>Geschäftsführer: Alexander Böhm, Ole Schaumberg</p>
            <p>E-Mail: Info@montamo.com</p>
            <p>Amtsgericht Berlin Charlottenburg</p>
            <p>HRB 256899 B</p>
            <p>USt-ID-Nr: DE363819789</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">EU-Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter <a href="http://ec.europa.eu/consumers/odr/" className="text-primary hover:underline">http://ec.europa.eu/consumers/odr/</a> finden.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Haftung für Inhalte</h2>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Copyright</h2>
            <p>The content and works published on these pages are governed by German copyright law. Any duplication, processing, distribution, or any form of utilization beyond the scope of copyright law shall require the prior written consent of the respective author or creator.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
