'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-secondary text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-primary font-bold text-xl">Montamo</h3>
            <p className="text-sm mt-1">Ihr Experte für Wärmepumpen</p>
          </div>
          
          <div className="text-sm text-center md:text-right">
            <p>© {currentYear} Montamo GmbH. Alle Rechte vorbehalten.</p>
            <p className="mt-1">
              <a href="#" className="text-primary hover:underline">Impressum</a> | 
              <a href="#" className="text-primary hover:underline ml-2">Datenschutz</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 