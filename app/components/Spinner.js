export default function Spinner() {
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" 
         role="status" 
         aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
} 