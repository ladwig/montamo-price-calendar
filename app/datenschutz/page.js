import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-secondary mb-8">Datenschutzerklärung</h1>
        
        <div className="prose max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Allgemeine Informationen</h2>
            <p>Diese Datenschutzerklärung regelt die Erfassung, Nutzung und Offenlegung von personenbezogenen Daten durch die montamo GmbH im Zusammenhang mit der Nutzung der Website montamo.com (im Folgenden &quot;Website&quot; genannt).</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Erhebung und Verwendung personenbezogener Daten</h2>
            <h3 className="text-lg font-semibold mb-2">Besucherinformationen</h3>
            <p>Bei Ihrem Besuch unserer Website können bestimmte Informationen automatisch erfasst und in Logdateien gespeichert werden. Diese Informationen können Ihre IP-Adresse, Browsertyp, Referrer-URLs, Datum und Uhrzeit des Zugriffs, besuchte Seiten und andere ähnliche Informationen umfassen. Wir verwenden diese Informationen zur Analyse von Trends, zur Verwaltung der Website, zur Nachverfolgung der Benutzerbewegungen auf der Website und zur Sammlung demographischer Informationen über unsere Nutzerbasis als Ganzes. Diese Informationen werden anonymisiert und nicht mit personenbezogenen Daten in Verbindung gebracht, es sei denn, dies ist gesetzlich vorgeschrieben.</p>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Kontaktformular</h3>
            <p>Wenn Sie das Kontaktformular auf unserer Website nutzen, können wir personenbezogene Daten wie Ihren Namen, Ihre E-Mail-Adresse und Ihre Telefonnummer erfassen. Wir verwenden diese Informationen, um auf Ihre Anfrage zu antworten und Ihnen die gewünschten Informationen zur Verfügung zu stellen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Weitergabe von personenbezogenen Daten</h2>
            <p>Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, es sei denn, dies ist zur Erfüllung rechtlicher Verpflichtungen oder zur Durchführung unserer Dienstleistungen erforderlich. In solchen Fällen werden angemessene Maßnahmen ergriffen, um sicherzustellen, dass Ihre personenbezogenen Daten angemessen geschützt und gemäß den geltenden Datenschutzgesetzen behandelt werden.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Datensicherheit</h2>
            <p>Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, unbefugter Offenlegung, Missbrauch oder Verlust zu schützen. Trotz dieser Maßnahmen kann keine Sicherheit im Internet zu 100 % garantiert werden, und wir können keine absolute Sicherheit Ihrer personenbezogenen Daten gewährleisten.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Cookies</h2>
            <p>Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die über Ihren Internetbrowser auf Ihrem Computersystem abgelegt und gespeichert werden. Sie haben jederzeit die Möglichkeit, die Verwendung von Cookies auf unserer Website durch entsprechende Einstellungen in Ihrem Internetbrowser zu verhindern und damit der Platzierung von Cookies dauerhaft zu widersprechen.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Google Analytics</h2>
            <p>Wir nutzen Google Analytics mit Anonymisierungsfunktion. Google Analytics ist ein Webanalyse-Dienst, der Daten über das Verhalten der Besucher von Websites erhebt, sammelt und auswertet. Sie können der Erfassung durch Google Analytics widersprechen, indem Sie das Browser-Add-On zur Deaktivierung von Google Analytics installieren (<a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>).</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">Kontakt</h2>
            <p>Wenn Sie Fragen, Bedenken oder Anfragen bezüglich dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter:</p>
            <p className="mt-2">
              montamo GmbH<br />
              Julie-Wolfthorn-Straße 1<br />
              10115 Berlin<br />
              Deutschland
            </p>
            <p className="mt-2">E-Mail: info@montamo.com</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
