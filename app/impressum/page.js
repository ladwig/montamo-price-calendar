import Footer from '../components/Footer';

export default function Imprint() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-secondary mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              montamo GmbH<br />
              Julie-Wolfthorn-Straße 1<br />
              10115 Berlin<br />
              Deutschland
            </p>
            
            <p className="mt-4">
              Handelsregister: HRB 123456<br />
              Registergericht: Amtsgericht Berlin-Charlottenburg
            </p>
            
            <p className="mt-4">
              Vertreten durch:<br />
              Geschäftsführer: Daniel Mössinger
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Kontakt</h2>
            <p>
              Telefon: +49 (0) 123 456789<br />
              E-Mail: info@montamo.com
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE123456789
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
            <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            <p className="mt-2">Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Haftung für Inhalte</h2>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
