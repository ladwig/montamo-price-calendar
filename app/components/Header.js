import Image from 'next/image';

export default function Header() {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-center">
        <Image 
          src="/logo.png" 
          alt="Montamo Logo" 
          width={50} 
          height={50} 
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
} 