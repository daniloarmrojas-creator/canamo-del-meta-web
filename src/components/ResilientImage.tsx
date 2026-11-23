import { useState } from 'react';
import { Sprout } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export default function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAEFE8] to-[#DCE4D9] text-[#2B4635] p-6 text-center ${className}`}
      >
        <Sprout className="w-8 h-8 mb-2 opacity-75" strokeWidth={1.5} />
        <span className="text-sm font-medium">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
