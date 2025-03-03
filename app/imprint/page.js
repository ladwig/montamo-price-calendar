import Footer from '../components/Footer';

export default function Imprint() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-secondary mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <div className="mb-8">
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
            <h2 className="text-xl font-semibold text-secondary mb-4">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
