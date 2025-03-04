import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white shadow-md py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Montamo. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-4">
            <Link href="/imprint" className="text-sm text-secondary hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-sm text-secondary hover:text-primary transition-colors">
              Datenschutz
            </Link>
            <Link href="/nonexistent" className="text-sm text-secondary hover:text-primary transition-colors">
              Nonexistent Page
            </Link>
            <Link href="/invalid" className="text-sm text-secondary hover:text-primary transition-colors">
              Invalid Link
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}