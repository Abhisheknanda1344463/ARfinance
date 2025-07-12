import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <a href="#home" className="inline-block">
      <div className={`flex items-center cursor-pointer ${className}`}>
        <img 
          src="/assets/ARlogo.png" 
          alt="AR Finance Logo"
          className="h-16 w-auto object-contain"
        />
        <span
          className="text-xl font-bold italic mt-2 -ml-3"
          style={{ color: '#1976D2' }}
        >
          Finance
        </span>
      </div>
    </a>
  );
};

export default Logo;