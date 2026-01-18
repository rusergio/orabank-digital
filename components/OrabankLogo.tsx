import React from 'react';

interface OrabankLogoProps {
  size?: number;
  className?: string;
}

const OrabankLogo: React.FC<OrabankLogoProps> = ({ size = 64, className = '' }) => {
  return (
    <img
      src="/img/oranbak-bissau.jpg"
      alt="Orabank Logo"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        borderRadius: '12px'
      }}
    />
  );
};

export default OrabankLogo;

